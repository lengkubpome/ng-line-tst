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

export const addProductsSuccess = createAction(
  '[Product] Add Products Success',
  props<{ product: IProduct }>()
);

export const addProductsFailure = createAction(
  '[Product] Add Products Failure',
  props<{ errorMessage: string }>()
);

export const updateProduct = createAction(
  '[Product] Update Products',
  props<{ updateProduct: IProduct }>()
);
export const updateProductSuccess = createAction(
  '[Product] Update Products Success',
  props<{ updateProduct: IProduct }>()
);
export const updateProductFailure = createAction(
  '[Product] Update Products Failure',
  props<{ errorMessage: string }>()
);

export const deleteProducts = createAction(
  '[Product] Delete Products',
  props<{ id: string }>()
);
