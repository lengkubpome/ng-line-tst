import {
  IProduct,
  IProductOption,
  IProductHistory,
} from './../models/product.model';
import { createAction, props } from '@ngrx/store';

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
  '[Product] Add Product Success'
  // props<{ product: IProduct }>()
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
  '[Product] Update Product Success'
  // props<{ updateProduct: IProduct }>()
);
export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ errorMessage: string }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ product: IProduct }>()
);

export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success'
);

export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ errorMessage: string }>()
);

// Product Option

export const loadProductOptions = createAction(
  '[Product] Load Product Options'
);

export const loadProductOptionsSuccess = createAction(
  '[Product] Load Product Options Success',
  props<{ productOptions: IProductOption[] }>()
);

export const loadProductOptionsFailure = createAction(
  '[Product] Load Product Options Failure',
  props<{ errorMessage: string }>()
);

export const addProductOption = createAction(
  '[Product] Add Product Option',
  props<{ option: IProductOption }>()
);

export const addProductOptionSuccess = createAction(
  '[Product] Add Product Option Success'
);

export const addProductOptionFailure = createAction(
  '[Product] Add Product Option Failure',
  props<{ errorMessage: string }>()
);

export const updateProductOption = createAction(
  '[Product] Update Product Option',
  props<{ updateOption: IProductOption }>()
);
export const updateProductOptionSuccess = createAction(
  '[Product] Update Product Option Success'
);
export const updateProductOptionFailure = createAction(
  '[Product] Update Product Option Failure',
  props<{ errorMessage: string }>()
);

export const deleteProductOption = createAction(
  '[Product] Delete Product Option',
  props<{
    deleteOption: IProductOption;
  }>()
);

export const deleteProductOptionSuccess = createAction(
  '[Product] Delete Product Option Success',
  props<{ deleteOption: IProductOption }>()
);

export const deleteProductOptionFailure = createAction(
  '[Product] Delete Product Option Failure',
  props<{ errorMessage: string }>()
);

export const addProductHistory = createAction(
  '[Product] Add Product History',
  props<{ newData: IProduct; oldData: IProduct }>()
);

export const addProductHistorySuccess = createAction(
  '[Product] Add Product History Success'
  // props<{ history: IProductHistory }>()
);

export const swapProductOption = createAction(
  '[Product] Swap Product Option',
  props<{
    option1: IProductOption;
    option2: IProductOption;
  }>()
);

export const swapProductOptionSuccess = createAction(
  '[Product] Swap Product Option Success'
);
export const swapProductOptionFailure = createAction(
  '[Product] Swap Product Option Failure',
  props<{ errorMessage: string }>()
);

export const productActionFailure = createAction(
  '[Product] Product Action Failure',
  props<{ errorMessage: string }>()
);
