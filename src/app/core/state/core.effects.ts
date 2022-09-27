import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, tap, first } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as CoreActions from './core.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CoreEffects {
  errorMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.setErrorMessage),
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
