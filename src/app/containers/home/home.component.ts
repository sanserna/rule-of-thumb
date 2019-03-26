import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { cloneDeep, round } from 'lodash';

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
    this._userSubscription = this._authService.user$.subscribe(
      user => (this.user = user)
    );
    this._voteItemsSubscription = this._votesService.$voteItems.subscribe(
      voteItems => {
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
      }
    );
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

    if (voteType === 'positive') {
      newVoteItem.meta.positive_votes++;
    } else {
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
    const oneDay = 1000 * 60 * 60 * 24;
    const createdAtDate = new Date(createdAt);
    const dueDate = new Date(voteItemDueDate);
    const dateNow = new Date();
    const daysPassed = round(
      (dateNow.getTime() - createdAtDate.getTime()) / oneDay
    );
    const totalDays = round(
      (dueDate.getTime() - createdAtDate.getTime()) / oneDay
    );

    this.daysPassedPercentage = round((daysPassed * 100) / totalDays);
    this.daysLeftPercentage = totalDays - daysPassed;
  }
}
