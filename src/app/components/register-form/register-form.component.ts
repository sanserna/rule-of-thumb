import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  // COMPONENT LIFECYCLE HOOKS -------------------------------------------------

  ngOnInit() {
    this.registerForm = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // COMPONENT METHODS ---------------------------------------------------------

  isInvalidRegisterFormGroupInput(inputName: string): boolean {
    return (
      this.registerForm.get(inputName).invalid &&
      (this.registerForm.get(inputName).dirty ||
        this.registerForm.get(inputName).touched)
    );
  }

  // COMPONENT PRIVATE METHODS -------------------------------------------------
}
