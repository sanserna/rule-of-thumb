import { Component, OnInit, Input } from '@angular/core';

import { VoteItem } from '@app-models/vote-item';

@Component({
  selector: 'app-voting-card-detailed',
  templateUrl: './voting-card-detailed.component.html',
  styleUrls: ['./voting-card-detailed.component.scss']
})
export class VotingCardDetailedComponent implements OnInit {
  @Input() voteItem: VoteItem;
  @Input() votingDisabled: boolean;

  activeVoteType = 'positive';

  constructor() {}

  // COMPONENT LIFECYCLE HOOKS -------------------------------------------------

  ngOnInit() {
    this.votingDisabled = false;
  }

  // COMPONENT METHODS ---------------------------------------------------------

  changeActiveVoteType(voteType: string): void {
    this.activeVoteType = voteType;
  }

  // COMPONENT PRIVATE METHODS -------------------------------------------------
}
