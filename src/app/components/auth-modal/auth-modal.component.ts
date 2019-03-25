import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { AuthService } from '@app-providers/auth.service';
import { markFormGroupDirty } from '@app-util/forms.util';
import { LoginFormComponent } from '@app-components/login-form/login-form.component';
import { RegisterFormComponent } from '@app-components/register-form/register-form.component';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit, AfterViewInit {
  private _loginFormGroup: FormGroup;
  private _registerFormGroup: FormGroup;
  private _authError = new Subject<string>();

  authError: string;
  loginActionInProgress = false;
  registerActionInProgress = false;
  activeView = 'login';

  @ViewChild(LoginFormComponent) loginFormComponent: LoginFormComponent;
  @ViewChild(RegisterFormComponent)
  registerFormComponent: RegisterFormComponent;

  constructor(
    private _authService: AuthService,
    public activeModal: NgbActiveModal
  ) {}

  // COMPONENT LIFECYCLE HOOKS -------------------------------------------------

  ngOnInit() {
    this._authError.subscribe(message => (this.authError = message));

    this._authError
      .pipe(debounceTime(4000))
      .subscribe(() => (this.authError = null));
  }

  ngAfterViewInit() {
    this._loginFormGroup = this.loginFormComponent.loginForm;
    this._registerFormGroup = this.registerFormComponent.registerForm;
  }

  // COMPONENT METHODS ---------------------------------------------------------

  signInWithEmail(): void {
    markFormGroupDirty(this._loginFormGroup);

    if (this._loginFormGroup.invalid) {
      return;
    }

    this.loginActionInProgress = true;

    const email = this._loginFormGroup.get('email').value;
    const password = this._loginFormGroup.get('password').value;

    this._authService
      .signIn(email, password)
      .then(() => {
        this.activeModal.close();
      })
      .catch(err => {
        let errMsg = 'Ha ocurrido un error en el proceso de inicio se sesión';

        if (err.status === 401) {
          errMsg = 'Usuario o contraseña invalido';
        }

        this._authError.next(errMsg);
      })
      .then(() => (this.loginActionInProgress = false));
  }

  signup(): void {
    markFormGroupDirty(this._registerFormGroup);

    if (this._registerFormGroup.invalid) {
      return;
    }

    this.registerActionInProgress = true;

    const name = this._registerFormGroup.get('name').value;
    const email = this._registerFormGroup.get('email').value;
    const password = this._registerFormGroup.get('password').value;

    this._authService
      .signUpWithEmail(name, email, password)
      .then(() => {
        this.activeModal.close();
      })
      .catch(err => {
        this._authError.next('Ha ocurrido un error en el proceso de registro');
      })
      .then(() => (this.registerActionInProgress = false));
  }

  // COMPONENT PRIVATE METHODS -------------------------------------------------
}
