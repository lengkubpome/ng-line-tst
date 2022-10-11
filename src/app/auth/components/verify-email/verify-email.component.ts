import { IUser } from './../../models/user.model';
import { Observable, of } from 'rxjs';
import { AuthFirebaseService } from './../../services/auth-firebase.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState, selectUser } from '../../state';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.less'],
})
export class VerifyEmailComponent implements OnInit {
  user$: Observable<IUser | null> = of(null);

  constructor(
    public authFBservice: AuthFirebaseService,
    private store: Store<AuthState>
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(selectUser);
  }

  onResendVerificationMail() {
    this.authFBservice.sendVerificationMail();
  }
}
