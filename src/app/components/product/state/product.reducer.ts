import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { CallState, LoadingState } from '@shared/state/call-state';
import { IProduct } from 'app/components/product/models/product.model';
import * as ProductActions from './product.actions';

export const productFeatureKey = 'product';

export interface ProductState {
  products: IProduct[] | null;
  // error: string | null;
  // isLoading: boolean;
  // isLoaded: boolean;
  callState: CallState;
}

const initialState: ProductState = {
  products: [],
  // error: null,
  // isLoading: false,
  // isLoaded: false,
  callState: LoadingState.INIT,
};

export const productReducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, (state) => ({
    ...state,
    // isLoaded: false
    callState: LoadingState.LOADING,
  })),

  on(ProductActions.loadProductsSuccess, (state, action) => ({
    ...state,
    products: action.products,
    // error: null,
    // isLoading: false,
    // isLoaded: true,
    callState: LoadingState.LOADED,
  }))
);
