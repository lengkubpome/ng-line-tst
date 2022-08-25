import { IProductOption } from './../models/product.model';
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

export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: IProduct }>()
);

export const addProductSuccess = createAction(
  '[Product] Add Product Success',
  props<{ product: IProduct }>()
);

export const addProductFailure = createAction(
  '[Product] Add Product Failure',
  props<{ errorMessage: string }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ updateProduct: IProduct }>()
);
export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ updateProduct: IProduct }>()
);
export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ errorMessage: string }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ id: string }>()
);

export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ errorMessage: string }>()
);

// Product Option
export const addProductOption = createAction(
  '[Product] Add Product Option',
  props<{ product: IProduct; option: IProductOption }>()
);

export const addProductOptionSuccess = createAction(
  '[Product] Add Product Option Success',
  props<{ product: IProduct; option: IProductOption }>()
);

export const addProductOptionFailure = createAction(
  '[Product] Add Product Option Failure',
  props<{ errorMessage: string }>()
);
