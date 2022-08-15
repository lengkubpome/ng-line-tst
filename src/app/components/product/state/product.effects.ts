import { IProduct } from 'app/components/product/models/product.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, take, tap } from 'rxjs/operators';
import { EMPTY, of, switchMap } from 'rxjs';
import * as ProductActions from './product.actions';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          switchMap((products: any[]) =>
            this.productService.getProductOptions().pipe(
              map((options: any[]) => {
                let result: IProduct[] = [];
                products.forEach((p: any) => {
                  let product: IProduct = {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    priceChange: p.price_change,
                    changeDate: p.change_date,
                    status: p.status,
                    productOptions: [],
                  };

                  let option = options.filter(
                    (o) => o.product_id === product.id
                  );

                  option.forEach((o) => {
                    const memberTypes = (o.member_type as string).split(',');

                    const option = {
                      memberTypes: memberTypes,
                      addonPrice: o.addon_price,
                      description: o.description,
                      status: o.status,
                    };
                    product.productOptions?.push(option);
                  });
                  result.push(product);
                });

                // console.log(result);
                return result;
              })
            )
          ),
          map((products) => {
            // this.snackBar.open('Test123', '1234');
            return ProductActions.loadProductsSuccess({ products });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {}
}
