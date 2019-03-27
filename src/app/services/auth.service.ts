import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap, map, take } from 'rxjs/operators';
import { merge, cloneDeep } from 'lodash';

import { environment } from '@app-environment/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _signupApiEndpint = `${environment.apiEndpoint}/signup`;
  private _signinApiEndpint = `${environment.apiEndpoint}/signin`;
  private _userApiEndpint = `${environment.apiEndpoint}/api/user`;
  private _userSubject = new BehaviorSubject<User>(null);
  private _token: string;

  user$: Observable<User> = this._userSubject.asObservable();

  constructor(private _httpClient: HttpClient) {
    const token = this._getToken();

    if (token) {
      this._getUserData(token)
        .pipe(
          take(1),
          tap(userData => {
            userData.votes = userData.votes || {};
            this._userSubject.next(userData);
          })
        )
        .subscribe();
    }
  }

  signUpWithEmail(name: string, email: string, password: string): Promise<any> {
    return this._httpClient
      .post<any>(this._signupApiEndpint, {
        name,
        email,
        password
      })
      .pipe(
        switchMap(({ token }) => {
          this._saveToken(token);

          return this._getUserData(token);
        }),
        tap(user => {
          this._userSubject.next(user);
        })
      )
      .toPromise();
  }

  signIn(email: string, password: string): Promise<User> {
    return this._httpClient
      .post<any>(this._signinApiEndpint, { email, password })
      .pipe(
        switchMap(({ token }) => {
          this._saveToken(token);

          return this._getUserData(token);
        }),
        tap(user => {
          this._userSubject.next(user);
        })
      )
      .toPromise();
  }

  updateUserVoteCountForVoteItem(
    voteItemId: string,
    value: number,
    userVotes: object,
    token: string
  ): Promise<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

    return this._httpClient
      .put<any>(
        `${this._userApiEndpint}`,
        {
          votes: {
            ...userVotes,
            [voteItemId]: value
          }
        },
        httpOptions
      )
      .pipe(
        map(response => response.data),
        tap(() => {
          const userData = cloneDeep(this._userSubject.value);

          userData.votes[voteItemId] = value;

          this._userSubject.next(userData);
        })
      )
      .toPromise();
  }

  logout() {
    this._token = '';
    sessionStorage.removeItem('token');
    this._userSubject.next(null);
  }

  isLoggedIn(): boolean {
    const user = this._getUserDetails();

    if (user) {
      return user.exp > Date.now() / 1000;
    }

    return false;
  }

  // HELPERS -------------------------------------------------------------------

  private _saveToken(token: string): void {
    sessionStorage.setItem('token', token);
    this._token = token;
  }

  private _getToken(): string {
    if (!this._token) {
      this._token = sessionStorage.getItem('token');
    }
    return this._token;
  }

  private _getUserDetails(): any {
    const token = this._getToken();

    let payload: string;

    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }

    return null;
  }

  private _getUserData(token: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    const userDetails = this._getUserDetails();

    return this._httpClient
      .get<any>(`${this._userApiEndpint}/${userDetails.id}`, httpOptions)
      .pipe(map(response => merge(userDetails, response.data)));
  }

  // SETTERS -------------------------------------------------------------------

  // GETTERS -------------------------------------------------------------------

  get token() {
    return this._token;
  }
}
