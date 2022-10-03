import { signOut } from './auth/state/auth.actions';
import { getLoading, getErrorMessage } from './shared/state/shared.selector';
import { Observable, of } from 'rxjs';
import { SharedState } from './shared/state/shared.reducer';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { autoLogin, getUser } from './auth/state';
import { User } from './auth/models/user.model';
@Component({
  selector: 'app-root',
  template: `
    <tui-root>
      <!-- content of your app -->
      <app-header></app-header>
      <button (click)="logOut()">Log out</button>

      <div *ngIf="user$ | async as user">
        <h1>Helo : {{ user.uid }}</h1>
      </div>
      <!-- <div class="container is-max-desktop"> -->
      <div class="tui-container tui-container_adaptive tui-space_top-5">
        <router-outlet></router-outlet>
      </div>
      <app-loader *ngIf="loading"></app-loader>
      <!--
     If you need, you can add something between Taiga portal layers:
    -->
      <ng-container ngProjectAs="tuiOverContent">
        <!-- Content over app content -->
      </ng-container>
      <ng-container ngProjectAs="tuiOverDialogs">
        <!-- Content over dialogs -->
      </ng-container>
      <ng-container ngProjectAs="tuiOverAlerts">
        <!-- Content over notifications -->
      </ng-container>
      <ng-container ngProjectAs="tuiOverPortals">
        <!-- Content over dropdowns -->
      </ng-container>
      <ng-container ngProjectAs="tuiOverHints">
        <!-- Content over hints -->
      </ng-container>
    </tui-root>
  `,
  styles: ['.container { margin: 1em; }'],
})
export class AppComponent implements AfterViewInit, OnInit {
  loading = false;
  user$!: Observable<User>;

  constructor(
    private store: Store<SharedState>,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.store.select(getLoading).subscribe((res) => {
      this.loading = res;
      this.cd.detectChanges();
    });

    // this.store.dispatch(autoLogin());
    this.store.dispatch(getUser());
  }

  ngOnInit(): void {}

  logOut(): void {
    this.store.dispatch(signOut({}));
  }
}
