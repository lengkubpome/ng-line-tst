import { AuthFirebaseService } from './../../services/auth-firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(public authFBservice: AuthFirebaseService) {}

  ngOnInit() {}
}
