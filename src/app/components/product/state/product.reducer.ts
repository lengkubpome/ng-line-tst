import { Action, createReducer, on } from '@ngrx/store';
import { CallState, LoadingState, ErrorState } from '@shared/state/call-state';
import { IProduct } from 'app/components/product/models/product.model';
import * as ProductActions from './product.actions';

export const productFeatureKey = 'product';

export interface ProductState {
  products: IProduct[];
  callState: CallState;
}

const initialState: ProductState = {
  products: [],
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
    callState: LoadingState.LOADED,
  })),
  on(ProductActions.loadProductsFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  })),

  // Add Product
  on(ProductActions.addProducts, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(ProductActions.addProductsSuccess, (state, action) => ({
    ...state,
    products: [...state.products, action.product],
    callState: LoadingState.LOADED,
  })),
  on(ProductActions.addProductsFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  })),
  // Update Product
  on(ProductActions.updateProduct, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(ProductActions.updateProductSuccess, (state, action) => {
    let newProductState = state.products.map((p) =>
      p.id === action.updateProduct.id ? action.updateProduct : p
    );

    return {
      ...state,
      products: newProductState,
      callState: LoadingState.LOADED,
    };
  }),
  on(ProductActions.updateProductFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  }))
);
