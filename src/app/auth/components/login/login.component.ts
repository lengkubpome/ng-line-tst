import * as LoginActions from './../../state/auth.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private store: Store<AuthState>) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required]],
    });
  }

  onLogingSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password as string;
    this.store.dispatch(LoginActions.login({ email, password }));
  }
}
