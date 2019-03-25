import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@app-environment/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _signupApiEndpint = `${environment.apiEndpoint}/signup`;
  private _signinApiEndpint = `${environment.apiEndpoint}/signin`;
  private _userSubject = new BehaviorSubject<User>(null);
  private _token: string;

  user$: Observable<User> = this._userSubject.asObservable();

  constructor(private _httpClient: HttpClient) {}

  signUpWithEmail(name: string, email: string, password: string): Promise<any> {
    return this._httpClient
      .post<any>(this._signupApiEndpint, {
        name,
        email,
        password
      })
      .pipe(
        tap(({ token }) => {
          this._saveToken(token);
          this._userSubject.next(this._getUserDetails());
        })
      )
      .toPromise();
  }

  signIn(email: string, password: string): Promise<any> {
    return this._httpClient
      .post<any>(this._signinApiEndpint, { email, password })
      .pipe(
        tap(({ token }) => {
          this._saveToken(token);
          this._userSubject.next(this._getUserDetails());
        })
      )
      .toPromise();
  }

  logout() {
    this._token = '';
    localStorage.removeItem('token');
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
    localStorage.setItem('token', token);
    this._token = token;
  }

  private _getToken(): string {
    if (!this._token) {
      this._token = localStorage.getItem('token');
    }
    return this._token;
  }

  private _getUserDetails(): User {
    const token = this._getToken();

    let payload: string;

    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }

    return null;
  }

  // SETTERS -------------------------------------------------------------------

  // GETTERS -------------------------------------------------------------------
}
