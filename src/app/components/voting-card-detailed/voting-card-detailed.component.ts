import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { round, capitalize } from 'lodash';
import * as moment from 'moment';

import { VoteItem } from '@app-models/vote-item';

@Component({
  selector: 'app-voting-card-detailed',
  templateUrl: './voting-card-detailed.component.html',
  styleUrls: ['./voting-card-detailed.component.scss']
})
export class VotingCardDetailedComponent implements OnInit {
  @Input() voteItem: VoteItem;
  @Input() alreadyVoted: boolean;

  @Output() voteAction: EventEmitter<string> = new EventEmitter();

  activeVoteType = 'positive';
  positiveVotesPercentage = 0;
  negativeVotesPercentage = 0;

  constructor() {}

  // COMPONENT LIFECYCLE HOOKS -------------------------------------------------

  ngOnInit() {
    this._calculateVotes();
  }

  // COMPONENT METHODS ---------------------------------------------------------

  changeActiveVoteType(voteType: string): void {
    this.activeVoteType = voteType;
  }

  submitVote(): void {
    this.voteAction.emit(this.activeVoteType);
  }

  toggleVotingControls(): void {
    this.alreadyVoted = false;
  }

  // COMPONENT PRIVATE METHODS -------------------------------------------------

  private _calculateVotes(): void {
    const {
      meta: { negative_votes, positive_votes }
    } = this.voteItem;
    const totalVotes = negative_votes + positive_votes;

    this.positiveVotesPercentage = positive_votes
      ? round((positive_votes * 100) / totalVotes)
      : 0;
    this.negativeVotesPercentage = negative_votes
      ? round((negative_votes * 100) / totalVotes)
      : 0;
  }

  // GETTERS -------------------------------------------------------------------

  get publicationAndCategory(): string {
    const dateNow = moment();
    const createdAtDate = moment(this.voteItem.createdAt);

    const diffMonths = dateNow.diff(createdAtDate, 'months');
    const diffDays = dateNow.diff(createdAtDate, 'days');
    const diffHours = dateNow.diff(createdAtDate, 'hours');

    let diff: string;

    if (diffMonths > 0) {
      diff = `${diffMonths} month`;
    } else if (diffDays > 0) {
      diff = `${diffDays} day`;
    } else {
      diff = `${diffHours} hour`;
    }

    return `${diff + (!!diff && 's')} ago in ${capitalize(
      this.voteItem.category
    )}`;
  }
}
