import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { environment } from '@app-environment/environment';
import { VoteItem } from '@app-models/vote-item';

@Injectable({
  providedIn: 'root'
})
export class VotesService {
  private _votesApiEndpint = `${environment.apiEndpoint}/api/vote-item`;
  private _voteItemsSubject = new BehaviorSubject<VoteItem[]>(null);

  $voteItems: Observable<VoteItem[]> = this._voteItemsSubject.asObservable();

  constructor(private _httpClient: HttpClient) {
    this._loadVoteItems();
  }

  updateVoteItem(voteItem: VoteItem): Promise<VoteItem> {
    return this._httpClient
      .put<VoteItem>(this._votesApiEndpint, voteItem)
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

  // SETTERS -------------------------------------------------------------------

  // GETTERS -------------------------------------------------------------------
}
