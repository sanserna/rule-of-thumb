import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VoteItem } from '@app-models/vote-item';

@Component({
  selector: 'app-voting-card-simple',
  templateUrl: './voting-card-simple.component.html',
  styleUrls: ['./voting-card-simple.component.scss']
})
export class VotingCardSimpleComponent implements OnInit {
  @Input() voteItem: VoteItem;

  @Output() voteAction: EventEmitter<string> = new EventEmitter();

  constructor() {}

  // COMPONENT LIFECYCLE HOOKS -------------------------------------------------

  ngOnInit() {}

  // COMPONENT METHODS ---------------------------------------------------------

  submitVote(voteType: string): void {
    this.voteAction.emit(voteType);
  }

  // COMPONENT PRIVATE METHODS -------------------------------------------------
}
