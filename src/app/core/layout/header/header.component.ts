import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedState } from '@shared/state';
import { autoLogout } from 'app/auth/state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuActive = false;

  constructor(private store: Store<SharedState>) {}

  ngOnInit(): void {}

  onShowMenu(): void {
    this.menuActive = !this.menuActive;
  }

  onCloseMenu(): void {
    this.menuActive = false;
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
