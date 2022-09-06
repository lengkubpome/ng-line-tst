import { IProduct, IProductOption } from './../models/product.model';
import { SharedState } from './../../../shared/state/shared.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of, switchMap } from 'rxjs';
import * as ProductActions from './product.actions';
import { ProductService } from '../services/product.service';
import { Store } from '@ngrx/store';

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

  // loadProducts$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ProductActions.loadProducts),
  //     mergeMap(() =>
  //       this.productService.getProducts().pipe(
  //         switchMap((products: any[]) =>
  //           this.productService.getProductOptions().pipe(
  //             map((options: any[]) => {
  //               let result: IProduct[] = [];

  //               console.log(products);

  //               products.forEach((p: any) => {
  //                 let product: IProduct = {
  //                   id: p.id,
  //                   name: p.name,
  //                   price: p.price,
  //                   priceChange: p.price_change,
  //                   changeDate: p.change_date,
  //                   status: p.status,
  //                   productOptions: [],
  //                 };

  //                 let option = options.filter(
  //                   (o) => o.product_id === product.id
  //                 );

  //                 option.forEach((o) => {
  //                   const memberTypes = (o.member_type as string).split(',');

  //                   const option = {
  //                     memberTypes: memberTypes,
  //                     addonPrice: o.addon_price,
  //                     description: o.description,
  //                     status: o.status,
  //                     order: o.order,
  //                   };
  //                   product.productOptions?.push(option);
  //                 });
  //                 result.push(product);
  //               });
  //               return result;
  //             })
  //           )
  //         ),
  //         map((products) => {
  //           return ProductActions.loadProductsSuccess({ products });
  //         }),
  //         catchError((errResp) => {
  //           return EMPTY;
  //         })
  //       )
  //     )
  //   )
  // );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      switchMap((data) =>
        this.productService.addProduct(data.product).pipe(
          map((option) => {
            return ProductActions.addProductSuccess();
          }),
          catchError((errorMessage) => {
            return of(ProductActions.addProductFailure({ errorMessage }));
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
          map(() => {
            return ProductActions.updateProductSuccess();
          }),
          catchError((errorMessage) => {
            return of(ProductActions.updateProductFailure({ errorMessage }));
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
            return ProductActions.deleteProductSuccess();
          }),
          catchError((errorMessage) => {
            return of(ProductActions.deleteProductFailure({ errorMessage }));
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
            return of(ProductActions.addProductOptionFailure({ errorMessage }));
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
              ProductActions.updateProductOptionFailure({ errorMessage })
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
            of(ProductActions.deleteProductOptionFailure({ errorMessage }))
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
              of(ProductActions.swapProductOptionFailure({ errorMessage }))
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<SharedState>
  ) {}
}
