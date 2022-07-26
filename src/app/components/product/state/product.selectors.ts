import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from './product.reducer';

const selectProductState = createFeatureSelector<fromProduct.ProductState>(
  fromProduct.productFeatureKey
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (state) => !state.loaded
);

export const selectProducts = createSelector(
  selectProductState,
  (state: fromProduct.ProductState) => state.products
);
