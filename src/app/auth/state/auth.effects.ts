import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  switchMap,
  delay,
} from 'rxjs/operators';

import { of, Observable, from } from 'rxjs';
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
import { User } from '../models/user.model';

@Injectable()
export class AuthEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap((payload) => {
        return this.afAuth.authState.pipe(
          delay(200),
          map((authData) => {
            if (authData) {
              console.log(authData);

              const user = new User(
                authData.uid,
                authData.displayName!,
                authData.email!
              );
              return AuthActions.authenticated({ user });
            } else {
              return AuthActions.notAuthenticated();
            }
          }),
          tap(() => this.store.dispatch(setLoaded())),
          catchError((error) => {
            AuthActions.authError({ payload: error });
            return of(setErrorMessage({ errorMsg: error }));
          })
        );
      })
    )
  );

  signInWithEmailPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInWithEmailPassword),
      map((action) => {
        this.store.dispatch(setLoading());
        return action;
      }),
      switchMap((payload) => {
        console.log(payload);

        return from(
          this.afAuth.signInWithEmailAndPassword(
            payload.email,
            payload.password
          )
        ).pipe(
          map((credential) => {
            return AuthActions.getUser();
          })
        );
      }),
      catchError((error) => {
        AuthActions.authError({ payload: error });
        return of(setErrorMessage({ errorMsg: error }));
      })
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      // map((action) => this.store.dispatch(setLoading())),
      switchMap((payload) =>
        of(this.afAuth.signOut()).pipe(
          map((authData) => AuthActions.notAuthenticated()),
          catchError((error) => {
            AuthActions.authError({ payload: error });
            return of(setErrorMessage({ errorMsg: error }));
          })
        )
      )
    )
  );

  // =============== Old ======================

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login2),
      tap(() => this.store.dispatch(setLoading())),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoaded());
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return AuthActions.loginSuccess({ user, redirect: true });
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
            return AuthActions.signupSuccess({ user, redirect: true });
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
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/products']);
          }
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage()!;
        return of(AuthActions.loginSuccess({ user, redirect: false }));
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.autoLogout),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['auth/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private store: Store<SharedState>,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}
}
