import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { IProduct } from 'app/components/product/models/product.model';
import * as ProductActions from './product.actions';

export const productFeatureKey = 'product';

export interface ProductState {
  products: IProduct[];
  loaded: boolean;
}

const initialState: ProductState = {
  products: [],
  loaded: true,
};

export const productReducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, (state) => ({ ...state, loaded: false })),

  on(ProductActions.loadProductsSuccess, (state, payload) => ({
    ...state,
    products: payload.products,
    loaded: true,
  }))
);
