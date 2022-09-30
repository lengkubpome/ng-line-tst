import { debounceTime, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from './../../state/auth.reducer';
import * as AuthActions from './../../state/auth.actions';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'app/auth/validators/custom.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  get f() {
    return this.registerForm.controls;
  }

  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }

  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  );

  constructor(private store: Store<AuthState>) {}

  ngOnInit() {}

  onSignupSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const email = this.registerForm.value.email!;
    const password = this.registerForm.value.password!;
    this.store.dispatch(AuthActions.signup({ email, password }));
  }
}
