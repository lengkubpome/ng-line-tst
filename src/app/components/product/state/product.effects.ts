import { IProduct, IProductOption } from './../models/product.model';
import { SharedState } from './../../../shared/state/shared.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY, switchMap } from 'rxjs';
import * as ProductActions from './product.actions';
import { ProductService } from '../services/product.service';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts2().pipe(
          switchMap((products: IProduct[]) =>
            this.productService.getProductOptions2().pipe(
              map((options: IProductOption[]) => {
                let result: IProduct[] = [];
                products.forEach((p: IProduct) => {
                  p.productOptions = options.filter(
                    (o) => o.productId === p.id
                  );
                  result.push(p);
                });
                return result;
              })
            )
          ),
          map((products) => {
            return ProductActions.loadProductsSuccess({ products });
          }),
          catchError((errResp) => {
            return EMPTY;
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
      map((data) => {
        // console.log(data.product);

        return ProductActions.addProductSuccess(data);
      })
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      map((data) => {
        return ProductActions.updateProductSuccess({
          updateProduct: data.updateProduct,
        });
      })
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      map((data) => {
        return ProductActions.deleteProductSuccess({
          id: data.id,
        });
      })
    )
  );

  addProductOption$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProductOption),
      map((data) => {
        let option: IProductOption = {
          ...data.option,
          productId: data.product.id,
        };

        this.productService.addProductOption(option);
        return data;
      }),
      map((data) => {
        return ProductActions.addProductOptionSuccess(data);
      })
    )
  );
  updateProductOption$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProductOption),
      map((data) => {
        // console.log(data.product);

        return ProductActions.updateProductOptionSuccess(data);
      })
    )
  );
  deleteProductOption$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProductOption),
      map((data) => {
        // console.log(data.product);

        return ProductActions.deleteProductOptionSuccess(data);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<SharedState>
  ) {}
}
