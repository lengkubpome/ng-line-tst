import { IProduct, IProductOption } from './../models/product.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { EMPTY, of, switchMap } from 'rxjs';
import * as ProductActions from './product.actions';
import { ProductService } from '../services/product.service';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoreState, setLoaded, setLoading } from '@core/state';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      tap(() => this.store.dispatch(setLoading())),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((products) => {
            return ProductActions.loadProductsSuccess({ products });
          }),
          catchError((errorMessage) => {
            this.snackBar.open(errorMessage.errorMessage, 'ปิด', {
              panelClass: ['snackbar-error'],
            });
            return of(ProductActions.productActionFailure({ errorMessage }));
          })
        )
      )
    )
  );

  loadProductsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsSuccess),
      switchMap(() =>
        this.productService.getProductOptions().pipe(
          map((options) => {
            return ProductActions.loadProductOptionsSuccess({
              productOptions: options,
            });
          }),
          tap(() => this.store.dispatch(setLoaded())),
          catchError((errorMessage) => {
            this.snackBar.open(errorMessage.errorMessage, 'ปิด', {
              panelClass: ['snackbar-error'],
            });
            return of(ProductActions.productActionFailure({ errorMessage }));
          })
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      switchMap((data) =>
        this.productService.addProduct(data.product).pipe(
          map((option) => {
            this.snackBar.open('คุณได้เพิ่มรายการสินค้าเรียบร้อย!', 'ปิด', {
              duration: 4000,
            });
            return ProductActions.addProductSuccess();
          }),
          catchError((errorMessage) => {
            this.snackBar.open(errorMessage.errorMessage, 'ปิด', {
              panelClass: ['snackbar-error'],
            });
            return of(ProductActions.productActionFailure({ errorMessage }));
          })
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      switchMap((data) => {
        return this.productService.updateProduct(data.updateProduct).pipe(
          map((res) => {
            this.snackBar.open('คุณแก้ไขรายการสินค้าเรียบร้อย!', 'ปิด', {
              duration: 4000,
            });
            return ProductActions.updateProductSuccess();
          }),
          catchError((errorMessage) => {
            this.snackBar.open(errorMessage.errorMessage, 'ปิด', {
              panelClass: ['snackbar-error'],
            });
            return of(ProductActions.productActionFailure({ errorMessage }));
          })
        );
      })
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      switchMap((data) => {
        return this.productService.deleteProduct(data.product).pipe(
          map(() => {
            this.snackBar.open('คุณลบรายการสินค้าเรียบร้อย!', 'ปิด', {
              duration: 4000,
            });
            return ProductActions.deleteProductSuccess();
          }),
          catchError((errorMessage) => {
            this.snackBar.open(errorMessage.errorMessage, 'ปิด', {
              panelClass: ['snackbar-error'],
            });
            return of(ProductActions.productActionFailure({ errorMessage }));
          })
        );
      })
    )
  );

  addProductOption$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProductOption),
      switchMap((data) => {
        let option: IProductOption = {
          ...data.option,
        };
        return this.productService.addProductOption(option).pipe(
          map((option) => {
            this.snackBar.open('คุณได้เพิ่มรายการสินค้าเรียบร้อย!', 'ปิด', {
              duration: 4000,
            });
            return ProductActions.addProductOptionSuccess();
          }),
          catchError((errorMessage) => {
            this.snackBar.open(errorMessage.errorMessage, 'ปิด', {
              panelClass: ['snackbar-error'],
            });
            return of(ProductActions.productActionFailure({ errorMessage }));
          })
        );
      })
    )
  );
  updateProductOption$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProductOption),
      switchMap((data) =>
        this.productService.updateProductOption(data.updateOption).pipe(
          map((option) => {
            this.snackBar.open('คุณแก้ไขรายการสินค้าเรียบร้อย!', 'ปิด', {
              duration: 4000,
            });
            return ProductActions.updateProductOptionSuccess();
          }),
          catchError((errorMessage) => {
            this.snackBar.open(errorMessage.errorMessage, 'ปิด', {
              panelClass: ['snackbar-error'],
            });
            return of(ProductActions.productActionFailure({ errorMessage }));
          })
        )
      )
    )
  );
  deleteProductOption$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProductOption),
      switchMap((data) => {
        return this.productService.deleteProductOption(data.deleteOption).pipe(
          map((option) => {
            this.snackBar.open('คุณลบรายการสินค้าเรียบร้อย!', 'ปิด', {
              duration: 4000,
            });
            return ProductActions.deleteProductOptionSuccess({
              deleteOption: option,
            });
          }),
          catchError((errorMessage) => {
            this.snackBar.open(errorMessage.errorMessage, 'ปิด', {
              panelClass: ['snackbar-error'],
            });
            return of(ProductActions.productActionFailure({ errorMessage }));
          })
        );
      })
    )
  );

  swapProductOption$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.swapProductOption),
      switchMap((data) =>
        this.productService
          .swapOrderProductOption(data.option1, data.option2)
          .pipe(
            map(() => {
              return ProductActions.swapProductOptionSuccess();
            }),
            catchError((errorMessage) => {
              this.snackBar.open(errorMessage.errorMessage, 'ปิด', {
                panelClass: ['snackbar-error'],
              });
              return of(ProductActions.productActionFailure({ errorMessage }));
            })
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private store: Store<CoreState>
  ) {}
}
