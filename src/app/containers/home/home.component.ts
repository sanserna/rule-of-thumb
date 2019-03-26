import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';

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
export class HomeComponent implements OnInit {
  private maxVotes = 3;

  user: User;

  constructor(
    public votesService: VotesService,
    private _userFeedbackCtrl: UserFeedbackControllerService,
    private _authViewCtrl: AuthViewControllerService,
    private _authService: AuthService
  ) {}

  // COMPONENT LIFECYCLE HOOKS -------------------------------------------------

  ngOnInit() {
    this._authService.user$.subscribe(user => (this.user = user));
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

    this.votesService
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
}
