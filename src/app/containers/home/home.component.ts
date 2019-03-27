import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { cloneDeep, round } from 'lodash';
import * as moment from 'moment';

import { VotesService } from '@app-providers/votes.service';
import { AuthService } from '@app-providers/auth.service';
import { AuthViewControllerService } from '@app-providers/auth-view-controller.service';
import { UserFeedbackControllerService } from '@app-providers/user-feedback-controller.service';
import { User } from '@app-models/user';
import { VoteItem } from '@app-models/vote-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private maxVotes = 3;
  private _userSubscription: Subscription;
  private _voteItemsSubscription: Subscription;

  user: User;
  voteItems: VoteItem[];
  bannerImg: string;
  mainVoteItem: VoteItem;
  daysPassedPercentage = 0;
  daysLeftPercentage = 0;

  constructor(
    private _votesService: VotesService,
    private _userFeedbackCtrl: UserFeedbackControllerService,
    private _authViewCtrl: AuthViewControllerService,
    private _authService: AuthService
  ) {}

  // COMPONENT LIFECYCLE HOOKS -------------------------------------------------

  ngOnInit() {
    this._userSubscription = this._authService.user$
      .pipe(
        flatMap(user => {
          this.user = user;

          return this._votesService.voteItems$;
        }),
        tap(voteItems => {
          if (voteItems.length) {
            this.mainVoteItem = voteItems[0];
            this.bannerImg = this.mainVoteItem.imageUrl;
            this.voteItems = voteItems;

            this._setMainVoteItemClosinBar(
              this.mainVoteItem.dueDate,
              this.mainVoteItem.createdAt
            );
          } else {
            this.bannerImg = 'assets/default-banner.jpg';
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this._userSubscription.unsubscribe();
    this._voteItemsSubscription.unsubscribe();
  }

  // COMPONENT METHODS ---------------------------------------------------------

  updateVoteItem(voteType: string, voteItem: VoteItem): void {
    if (!this._authService.isLoggedIn()) {
      this._authViewCtrl.openAuthDialog();
      return;
    }

    const newVoteItem = cloneDeep(voteItem);
    const userVoteItemCount = this.user.votes[voteItem._id] || 0;

    if (userVoteItemCount >= this.maxVotes) {
      this._userFeedbackCtrl.openDialog({
        type: 'warning',
        body: 'You have reached the maximum number of votes allowed!',
        title: 'Warning',
        acceptLabel: 'Accept'
      });

      return;
    }

    let voteIcon: string;

    if (voteType === 'positive') {
      voteIcon = 'fa-thumbs-up';
      newVoteItem.meta.positive_votes++;
    } else {
      voteIcon = 'fa-thumbs-down';
      newVoteItem.meta.negative_votes++;
    }

    this._votesService
      .updateVoteItem(newVoteItem, this._authService.token)
      .then(() => {
        return this._authService.updateUserVoteCountForVoteItem(
          voteItem._id,
          userVoteItemCount + 1,
          this.user.votes,
          this._authService.token
        );
      })
      .then(() => {
        this._userFeedbackCtrl.openDialog({
          type: 'success',
          body: `Thank you for voting!<br>you voted <i class="fa ${voteIcon} fa-lg pl-2" aria-hidden="true"></i>`,
          acceptLabel: 'Accept'
        });
      });
  }

  userAlreadyVoted(voteItemId: string): boolean {
    if (this.user) {
      return !!this.user.votes[voteItemId];
    }

    return false;
  }

  // COMPONENT PRIVATE METHODS -------------------------------------------------

  private _setMainVoteItemClosinBar(
    voteItemDueDate: string,
    createdAt: string
  ): void {
    const createdAtDate = moment(createdAt);
    const dueDate = moment(voteItemDueDate);
    const dateNow = moment();
    const daysPassed = dateNow.diff(createdAtDate, 'days');
    const totalDays = dueDate.diff(createdAtDate, 'days');

    this.daysPassedPercentage = round((daysPassed * 100) / totalDays);
    this.daysLeftPercentage = totalDays - daysPassed;
  }
}
