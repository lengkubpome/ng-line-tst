import { createAction, props } from '@ngrx/store';
import { IProduct } from 'app/components/product/models/product.model';

export const loadProducts = createAction('[Product] Load Products');

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: IProduct[] }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ errorMessage: string }>()
);

export const addProducts = createAction(
  '[Product] Add Products',
  props<{ product: IProduct }>()
);

export const updateProducts = createAction(
  '[Product] Update Products',
  props<{ product: IProduct }>()
);
export const deleteProducts = createAction(
  '[Product] Delete Products',
  props<{ id: string }>()
);
