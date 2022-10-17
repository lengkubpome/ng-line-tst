import { signOut } from './auth/state/auth.actions';
import {
  selectLoading,
  selectErrorMessage,
} from './shared/state/shared.selector';
import { Observable, of } from 'rxjs';
import { SharedState } from './shared/state/shared.reducer';
import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState, autoLogin, selectToken, getUser } from './auth/state';
import { User } from './auth/models/user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements AfterViewInit, OnInit {
  loading = false;
  token$: Observable<string | null> = of(null);
  token: string | null = '';

  showFiller = false;

  constructor(
    private store: Store<SharedState | AuthState>,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.store.select(selectLoading).subscribe((res) => {
      this.loading = res;
      this.cd.detectChanges();
    });

    // this.store.dispatch(autoLogin());
  }

  ngOnInit(): void {
    this.store.select(selectToken).subscribe((res) => (this.token = res));
    this.store.dispatch(getUser());
  }
}
