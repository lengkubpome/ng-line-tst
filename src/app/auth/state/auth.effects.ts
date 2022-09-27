import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, exhaustMap, map, tap, catchError } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { CoreState, setLoaded, setLoading, setErrorMessage } from '@core/state';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap(() => this.store.dispatch(setLoading())),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoaded());
            const user = this.authService.formatUser(data);
            return AuthActions.loginSuccess({ user });
          }),
          catchError((error) => {
            const errorMessage = this.authService.getErrorMessage(
              error.error.error.message
            );
            return of(setErrorMessage({ errorMsg: errorMessage }));
          })
        );
      })
    )
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => this.router.navigate(['/products']))
      ),
    { dispatch: false }
  );

  constructor(
    private store: Store<CoreState>,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
