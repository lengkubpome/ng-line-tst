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
import { AuthState, autoLogin, getToken, getUser } from './auth/state';
import { User } from './auth/models/user.model';
@Component({
  selector: 'app-root',
  template: `
    <tui-root>
      <!-- content of your app -->
      <app-header></app-header>
      <h1>Helo : {{ token }}</h1>
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
  token$: Observable<string | null> = of(null);
  token: string | null = '';

  constructor(
    private store: Store<SharedState | AuthState>,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.store.select(getLoading).subscribe((res) => {
      this.loading = res;
      this.cd.detectChanges();
    });

    // this.store.dispatch(autoLogin());
  }

  ngOnInit(): void {
    this.store.select(getToken).subscribe((res) => (this.token = res));
    this.store.dispatch(getUser());
  }
}
