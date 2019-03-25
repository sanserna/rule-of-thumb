import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '@app-models/user';
import { AuthService } from '@app-providers/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _userSubscription: Subscription;

  user: User;

  constructor(private _authService: AuthService) {}

  // COMPONENT LIFECYCLE HOOKS -------------------------------------------------

  ngOnInit() {
    this._userSubscription = this._authService.user$
      .pipe(
        tap(user => {
          this.user = user;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this._userSubscription.unsubscribe();
  }

  // COMPONENT METHODS ---------------------------------------------------------

  // COMPONENT PRIVATE METHODS -------------------------------------------------
}
