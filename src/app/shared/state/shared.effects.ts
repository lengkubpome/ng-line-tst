import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap } from 'rxjs/operators';
import * as SharedActions from './shared.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SharedEffects {
  errorMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SharedActions.setErrorMessage),
        tap((action) => {
          console.log(action.errorMsg);

          this.snackBar.open(action.errorMsg, 'ปิด', {
            panelClass: ['snackbar-error'],
          });
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}
}
