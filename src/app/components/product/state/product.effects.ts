import { IProduct, IProductOption } from './../models/product.model';
import { SharedState } from './../../../shared/state/shared.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of, switchMap } from 'rxjs';
import * as ProductActions from './product.actions';
import { ProductService } from '../services/product.service';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((products) => {
            return ProductActions.loadProductsSuccess({ products });
          }),
          catchError((errorMessage) => {
            return of(ProductActions.loadProductsFailure({ errorMessage }));
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
          catchError((errorMessage) => {
            return of(
              ProductActions.loadProductOptionsFailure({ errorMessage })
            );
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
            this.snackBar.open('คุณได้เพิ่มรายการสินค้าเรียบร้อย!', 'ปิด');
            return ProductActions.addProductSuccess();
          }),
          catchError((errorMessage) => {
            // return of(ProductActions.addProductFailure({ errorMessage }));
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
            this.snackBar.open('คุณแก้ไขรายการสินค้าเรียบร้อย!', 'ปิด');
            return ProductActions.updateProductSuccess();
          }),
          catchError((errorMessage) => {
            // return of(ProductActions.updateProductFailure({ errorMessage }));
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
            this.snackBar.open('คุณลบรายการสินค้าเรียบร้อย!', 'ปิด');
            return ProductActions.deleteProductSuccess();
          }),
          catchError((errorMessage) => {
            // return of(ProductActions.deleteProductFailure({ errorMessage }));
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
            return ProductActions.addProductOptionSuccess();
          }),
          catchError((errorMessage) => {
            // return of(ProductActions.addProductOptionFailure({ errorMessage }));
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
            return ProductActions.updateProductOptionSuccess();
          }),
          catchError((errorMessage) => {
            return of(
              // ProductActions.updateProductOptionFailure({ errorMessage })
              ProductActions.productActionFailure({ errorMessage })
            );
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
          map((option) =>
            ProductActions.deleteProductOptionSuccess({
              deleteOption: option,
            })
          ),
          catchError((errorMessage) =>
            // of(ProductActions.deleteProductOptionFailure({ errorMessage }))
            of(ProductActions.productActionFailure({ errorMessage }))
          )
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
            map(() => ProductActions.swapProductOptionSuccess()),
            catchError((errorMessage) =>
              // of(ProductActions.swapProductOptionFailure({ errorMessage }))
              of(ProductActions.productActionFailure({ errorMessage }))
            )
          )
      )
    )
  );

  productActionFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.productActionFailure),
      map((errorMessage) => {
        this.snackBar.open(errorMessage.errorMessage);
        return ProductActions.productActionFailure(errorMessage);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private store: Store<SharedState>
  ) {}
}
