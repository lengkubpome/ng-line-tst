import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  concatMap,
  exhaustMap,
  map,
  tap,
  catchError,
  mergeMap,
} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
// import { CoreState, setLoaded, setLoading, setErrorMessage } from '@core/state';
import { Store } from '@ngrx/store';
import {
  SharedState,
  setLoaded,
  setLoading,
  setErrorMessage,
} from '@shared/state';

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
            this.authService.setUserInLocalStorage(user);
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

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoaded());
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return AuthActions.signupSuccess({ user });
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

  // effects : loginSuccess, signupSuccess
  successRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(...[AuthActions.loginSuccess, AuthActions.signupSuccess]),
        tap((action) => this.router.navigate(['/products']))
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.autoLogin),
        map((action) => {
          const user = this.authService.getUserFromLocalStorage();
          console.log(user);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private store: Store<SharedState>,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
