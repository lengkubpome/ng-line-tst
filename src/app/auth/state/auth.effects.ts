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
import { AuthFirebaseService } from '../services/auth-firebase.service';

@Injectable()
export class AuthEffects {
  constructor(
    private store: Store<SharedState>,
    private actions$: Actions,
    private router: Router,
    private authFBSeriveice: AuthFirebaseService
  ) {}
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      map((action) => {
        this.store.dispatch(setLoading());
        return action;
      }),
      switchMap(() => {
        return this.authFBSeriveice.getUser().pipe(
          map((user) => {
            this.store.dispatch(setLoaded());
            if (user) {
              return AuthActions.authenticated({ user });
            } else {
              return AuthActions.notAuthenticated();
            }
          }),
          catchError((error) => {
            return of(setErrorMessage({ errorMsg: error }));
          })
        );
      })
    )
  );

  emailSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.emailSignIn),
      map((action) => {
        this.store.dispatch(setLoading());
        return action;
      }),
      switchMap((payload) => {
        return this.authFBSeriveice
          .emailSignIn(payload.email, payload.password)
          .pipe(
            map(() => {
              this.router.navigate(['home']);
              return AuthActions.getUser();
            }),
            catchError((error) => {
              return of(setErrorMessage({ errorMsg: error }));
            })
          );
      })
    )
  );

  emailSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      map((action) => {
        this.store.dispatch(setLoading());
        return action;
      }),
      switchMap((payload) => {
        return this.authFBSeriveice
          .emailSignUp(payload.email, payload.password)
          .pipe(
            map(() => {
              this.router.navigate(['auth/verify-email']);
              return AuthActions.getUser();
            }),
            catchError((error) => {
              return of(setErrorMessage({ errorMsg: error }));
            })
          );
      })
    )
  );

  signOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signOut),
        map((action) => {
          this.store.dispatch(setLoading());
          return action;
        }),
        switchMap(() =>
          this.authFBSeriveice.signOut().pipe(
            map(() => {
              return AuthActions.getUser();
            }),
            catchError((error) => {
              return of(setErrorMessage({ errorMsg: error }));
            })
          )
        )
      ),
    { dispatch: false }
  );

  successRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(...[AuthActions.authenticated, AuthActions.authenticated]),
        tap(() => {
          this.store.dispatch(setLoaded());
        })
      ),
    { dispatch: false }
  );

  // =============== Old ======================

  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.login2),
  //     tap(() => this.store.dispatch(setLoading())),
  //     exhaustMap((action) => {
  //       return this.authService.login(action.email, action.password).pipe(
  //         map((data) => {
  //           this.store.dispatch(setLoaded());
  //           const user = this.authService.formatUser(data);
  //           this.authService.setUserInLocalStorage(user);
  //           return AuthActions.loginSuccess({ user, redirect: true });
  //         }),
  //         catchError((error) => {
  //           const errorMessage = this.authService.getErrorMessage(
  //             error.error.error.message
  //           );
  //           return of(setErrorMessage({ errorMsg: errorMessage }));
  //         })
  //       );
  //     })
  //   )
  // );

  // signUp$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.signup),
  //     exhaustMap((action) => {
  //       return this.authService.signUp(action.email, action.password).pipe(
  //         map((data) => {
  //           this.store.dispatch(setLoaded());
  //           const user = this.authService.formatUser(data);
  //           this.authService.setUserInLocalStorage(user);
  //           return AuthActions.signupSuccess({ user, redirect: true });
  //         }),
  //         catchError((error) => {
  //           const errorMessage = this.authService.getErrorMessage(
  //             error.error.error.message
  //           );
  //           return of(setErrorMessage({ errorMsg: errorMessage }));
  //         })
  //       );
  //     })
  //   )
  // );

  // // effects : loginSuccess, signupSuccess
  // successRedirect$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(...[AuthActions.loginSuccess, AuthActions.signupSuccess]),
  //       tap((action) => {
  //         if (action.redirect) {
  //           this.router.navigate(['/products']);
  //         }
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // autoLogin$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.autoLogin),
  //     mergeMap((action) => {
  //       const user = this.authService.getUserFromLocalStorage()!;
  //       return of(AuthActions.loginSuccess({ user, redirect: false }));
  //     })
  //   )
  // );

  // logout$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.autoLogout),
  //       map((action) => {
  //         this.authService.logout();
  //         this.router.navigate(['auth/login']);
  //       })
  //     ),
  //   { dispatch: false }
  // );
}
