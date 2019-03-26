import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, take, map } from 'rxjs/operators';
import { filter, sortBy } from 'lodash';

import { environment } from '@app-environment/environment';
import { VoteItem } from '@app-models/vote-item';

@Injectable({
  providedIn: 'root'
})
export class VotesService {
  private _votesApiEndpint = `${environment.apiEndpoint}/api/vote-item`;
  private _voteItemsSubject = new BehaviorSubject<VoteItem[]>(null);

  $voteItems: Observable<
    VoteItem[]
  > = this._voteItemsSubject
    .asObservable()
    .pipe(
      map(voteItems =>
        sortBy(voteItems, voteItem => -new Date(voteItem.createdAt))
      )
    );

  constructor(private _httpClient: HttpClient) {
    this._loadVoteItems();
  }

  updateVoteItem(voteItem: VoteItem, token: string): Promise<VoteItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

    return this._httpClient
      .put<any>(
        `${this._votesApiEndpint}/${voteItem._id}`,
        voteItem,
        httpOptions
      )
      .pipe(
        map(response => response.data),
        tap(newVoteItem => this._updateVoteItemsList(newVoteItem))
      )
      .toPromise();
  }

  // HELPERS -------------------------------------------------------------------

  private _loadVoteItems(): void {
    this._httpClient
      .get<any>(this._votesApiEndpint)
      .pipe(
        take(1),
        tap(({ data: voteItems }) => {
          if (voteItems.length) {
            this._voteItemsSubject.next(voteItems);
          }
        })
      )
      .subscribe();
  }

  private _updateVoteItemsList(newVoteItem: VoteItem): void {
    const newList = filter(
      this._voteItemsSubject.value,
      voteItem => voteItem._id !== newVoteItem._id
    );

    newList.push(newVoteItem);

    this._voteItemsSubject.next(newList);
  }

  // SETTERS -------------------------------------------------------------------

  // GETTERS -------------------------------------------------------------------
}
