import * as AuthActions from './../../state/auth.actions';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Store } from '@ngrx/store';
import { AuthState, selectToken } from '../../state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Enter this!`,
        email: `Enter a valid email`,
      },
    },
  ],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private store: Store<AuthState>) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required]],
      autoLogin: [false],
    });
  }

  onLogingSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password as string;
    // this.store.dispatch(AuthActions.login2({ email, password }));
    this.store.dispatch(AuthActions.emailSignIn({ email, password }));
  }
}
