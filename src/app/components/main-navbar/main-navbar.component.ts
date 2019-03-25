import { Component, OnInit, Input } from '@angular/core';

import { User } from '@app-models/user';
import { AuthViewControllerService } from '@app-providers/auth-view-controller.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {
  @Input() user: User;

  constructor(private _authViewCtrl: AuthViewControllerService) {}

  // COMPONENT LIFECYCLE HOOKS -------------------------------------------------

  ngOnInit() {}

  // COMPONENT METHODS ---------------------------------------------------------

  openAuthenticationModal(): void {
    this._authViewCtrl.openAuthDialog().then(() => {
      console.log('hola');
    });
  }

  // COMPONENT PRIVATE METHODS -------------------------------------------------
}
