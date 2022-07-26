import { IProduct } from '@shared/models/product.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY, switchMap } from 'rxjs';
import * as ProductActions from './product.actions';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          switchMap((products: IProduct[]) =>
            this.productService.getProductOptions().pipe(
              map((options: any[]) => {
                products.forEach((product: IProduct) => {
                  product.price_option = [];

                  let option = options.filter(
                    (o) => o.product_id === product.product_id
                  );

                  option.forEach((o) => {
                    const memberTypes = (o.member_type as string).split(',');

                    const option = {
                      // product_id: o.product_id,
                      member_type: memberTypes,
                      addon_price: o.addon_price,
                      description: o.description,
                      status: o.status,
                    };
                    product.price_option?.push(option);
                  });
                });

                // console.log(products);
                return products;
              })
            )
          ),
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
