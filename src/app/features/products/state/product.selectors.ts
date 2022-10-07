import { CallState, getError, LoadingState } from '@shared/models/call-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from './product.reducer';

const selectProductState = createFeatureSelector<fromProduct.ProductState>(
  fromProduct.productFeatureKey
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (state) => state.callState === LoadingState.LOADING
);

export const selectProductError = createSelector(selectProductState, (state) =>
  getError(state.callState)
);

export const selectProducts = createSelector(
  selectProductState,
  (state: fromProduct.ProductState) => state.products
);

export const selectProductOptions = createSelector(
  selectProductState,
  (state: fromProduct.ProductState) => state.productOptions
);
