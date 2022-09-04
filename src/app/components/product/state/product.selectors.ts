import { CallState, getError, LoadingState } from '@shared/state/call-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from './product.reducer';

const getProductState = createFeatureSelector<fromProduct.ProductState>(
  fromProduct.productFeatureKey
);

export const getProductsLoading = createSelector(
  getProductState,
  (state) => state.callState === LoadingState.LOADING
);

export const getProductError = createSelector(getProductState, (state) =>
  getError(state.callState)
);

export const getProducts = createSelector(
  getProductState,
  (state: fromProduct.ProductState) => state.products
);

export const getProductOptions = createSelector(
  getProductState,
  (state: fromProduct.ProductState) => state.productOptions
);
