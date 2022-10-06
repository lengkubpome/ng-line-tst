import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedState } from '@shared/state';
import { autoLogout, signOut } from 'app/auth/state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuActive = false;

  constructor(private store: Store<SharedState>, private router: Router) {}

  ngOnInit(): void {}

  onShowMenu(): void {
    this.menuActive = !this.menuActive;
  }

  onCloseMenu(): void {
    this.menuActive = false;
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(signOut({}));
  }

  onTest() {
    this.router.navigate(['auth/verify-email']);
    this.menuActive = false;
  }
}
