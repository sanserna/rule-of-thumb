import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  // COMPONENT LIFECYCLE HOOKS -------------------------------------------------

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // COMPONENT METHODS ---------------------------------------------------------

  isInvalidLoginFormGroupInput(inputName: string): boolean {
    return (
      this.loginForm.get(inputName).invalid &&
      (this.loginForm.get(inputName).dirty ||
        this.loginForm.get(inputName).touched)
    );
  }

  // COMPONENT PRIVATE METHODS -------------------------------------------------
}
