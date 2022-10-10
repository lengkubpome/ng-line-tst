import { from } from 'rxjs';
import { AuthFirebaseService } from './../../services/auth-firebase.service';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/auth/state';
import * as AuthActions from './../../state/auth.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        email: `Enter a valid email`,
      },
    },
  ],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    public authFBservice: AuthFirebaseService,
    private store: Store<AuthState>
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [, [Validators.required, Validators.email]],
    });
  }

  onResetSubmit() {
    const email = this.form.value.email;
    this.store.dispatch(AuthActions.resetPassword({ email }));
  }
}
