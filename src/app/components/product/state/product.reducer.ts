import { IProductOption } from './../models/product.model';
import { Action, createReducer, on } from '@ngrx/store';
import { CallState, LoadingState, ErrorState } from '@shared/state/call-state';
import { IProduct } from 'app/components/product/models/product.model';
import * as ProductActions from './product.actions';

export const productFeatureKey = 'product';

export interface ProductState {
  products: IProduct[];
  productOptions: IProductOption[];
  callState: CallState;
}

const initialState: ProductState = {
  products: [],
  productOptions: [],
  callState: LoadingState.INIT,
};

export const productReducer = createReducer(
  initialState,
  // Load Product
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),

  on(ProductActions.loadProductsSuccess, (state, action) => ({
    ...state,
    products: action.products,
    // callState: LoadingState.LOADED,
  })),
  on(ProductActions.loadProductsFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  })),

  // Add Product
  on(ProductActions.addProduct, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(ProductActions.addProductSuccess, (state, action) => ({
    ...state,
    // products: [...state.products, action.product],
    callState: LoadingState.LOADED,
  })),
  on(ProductActions.addProductFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  })),
  // Update Product
  on(ProductActions.updateProduct, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(ProductActions.updateProductSuccess, (state, action) => {
    return {
      ...state,
      callState: LoadingState.LOADED,
    };
  }),
  on(ProductActions.updateProductFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  })),

  // Add Product History
  on(ProductActions.addProductHistory, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(ProductActions.addProductHistorySuccess, (state, action) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  // Delete Product
  on(ProductActions.deleteProduct, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(ProductActions.deleteProductSuccess, (state, action) => {
    return {
      ...state,
      callState: LoadingState.LOADED,
    };
  }),
  on(ProductActions.deleteProductFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  })),
  // TODO: Product Option
  on(ProductActions.loadProductOptions, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(ProductActions.loadProductOptionsSuccess, (state, action) => ({
    ...state,
    productOptions: action.productOptions,
    callState: LoadingState.LOADED,
  })),
  on(ProductActions.loadProductOptionsFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  })),

  on(ProductActions.addProductOption, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(ProductActions.addProductOptionSuccess, (state, action) => {
    return {
      ...state,
      callState: LoadingState.LOADED,
    };
  }),
  on(ProductActions.addProductOptionFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  })),
  on(ProductActions.updateProductOption, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(ProductActions.updateProductOptionSuccess, (state, action) => {
    return {
      ...state,
      callState: LoadingState.LOADED,
    };
  }),
  on(ProductActions.updateProductOptionFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  })),
  on(ProductActions.deleteProductOption, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),

  on(ProductActions.deleteProductOptionSuccess, (state) => {
    return {
      ...state,
      callState: LoadingState.LOADED,
    };
  }),

  on(ProductActions.deleteProductOptionFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  })),

  on(ProductActions.swapProductOption, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(ProductActions.swapProductOptionSuccess, (state, action) => {
    return {
      ...state,
      callState: LoadingState.LOADED,
    };
  }),
  on(ProductActions.swapProductOptionFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  })),
  on(ProductActions.addProductFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  }))
);
