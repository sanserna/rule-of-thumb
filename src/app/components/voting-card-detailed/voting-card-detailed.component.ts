import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { round } from 'lodash';

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

    if (negative_votes && positive_votes) {
      this.positiveVotesPercentage = round((positive_votes * 100) / totalVotes);
      this.negativeVotesPercentage = round((negative_votes * 100) / totalVotes);
    }
  }
}
