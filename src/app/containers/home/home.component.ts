import { Component, OnInit } from '@angular/core';

import { VotesService } from '@app-providers/votes.service';
import { AuthService } from '@app-providers/auth.service';
import { User } from '@app-models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(
    public votesService: VotesService,
    private _authService: AuthService
  ) {}

  // COMPONENT LIFECYCLE HOOKS -------------------------------------------------

  ngOnInit() {
    this._authService.user$.subscribe(user => (this.user = user));
  }

  // COMPONENT METHODS ---------------------------------------------------------

  // COMPONENT PRIVATE METHODS -------------------------------------------------
}
