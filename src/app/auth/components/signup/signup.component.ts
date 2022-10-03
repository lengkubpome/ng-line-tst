import { Store } from '@ngrx/store';
import { AuthState } from './../../state/auth.reducer';
import * as AuthActions from './../../state/auth.actions';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { CustomValidators } from 'app/auth/validators/custom.validator';
import { TuiValidationError } from '@taiga-ui/cdk';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Enter this!`,
        email: `Enter a valid email`,
        minlength: `Password must be 6 characters long or more`,
      },
    },
  ],
})
export class SignupComponent implements OnInit {
  get f() {
    return this.registerForm.controls;
  }

  get passwordMatchError(): TuiValidationError | null {
    return this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmPassword')?.touched
      ? new TuiValidationError(`Passwords do not match`)
      : null;
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
