import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { first, take, tap } from 'rxjs/operators';
import * as SharedActions from './shared.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable()
export class SharedEffects {
  errorMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SharedActions.setErrorMessage),
        tap((action) => {
          this.alertService
            .open(action.errorMsg, {
              // label: `Someting wrong.`,
              status: TuiNotification.Error,
              autoClose: 5000,
              hasCloseButton: true,
            })
            .pipe(take(1))
            .subscribe();

          // this.snackBar.open(action.errorMsg, 'ปิด', {
          //   panelClass: ['snackbar-error'],
          // });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private readonly alertService: TuiAlertService
  ) {}
}
