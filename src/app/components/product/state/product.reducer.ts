import { IProductOption } from './../models/product.model';
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
  on(ProductActions.addProduct, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(ProductActions.addProductSuccess, (state, action) => ({
    ...state,
    products: [...state.products, action.product],
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
    const newProductState = state.products.map((p) =>
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
  })),
  // Delete Product
  on(ProductActions.deleteProduct, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(ProductActions.deleteProductSuccess, (state, action) => {
    let newProductState = state.products.filter((p) => p.id !== action.id);
    return {
      ...state,
      products: newProductState,
      callState: LoadingState.LOADED,
    };
  }),
  on(ProductActions.deleteProductFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  })),
  // TODO: Product Option
  on(ProductActions.addProductOption, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(ProductActions.addProductOptionSuccess, (state, action) => {
    const newProductState = state.products.map((p) => {
      if (p.id === action.product.id) {
        const order = p.productOptions ? p.productOptions.length + 1 : 1;
        const newProductOption: IProductOption = { order, ...action.option };
        return {
          ...p,
          productOptions: p.productOptions!.concat(newProductOption),
        };
      }
      return p;
    });
    return {
      ...state,
      products: newProductState,
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
    const newProductState = state.products.map((p) => {
      if (p.id === action.product.id) {
        const updateProduct = p.productOptions!.map((o) => {
          if (o.order === action.updateOption.order) {
            return action.updateOption;
          }
          return o;
        });
        return {
          ...p,
          productOptions: updateProduct,
        };
      }
      return p;
    });
    return {
      ...state,
      products: newProductState,
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

  on(ProductActions.deleteProductOptionSuccess, (state, action) => {
    const newProductState = state.products.map((p) => {
      if (p.id === action.product.id) {
        const updateProduct = p.productOptions!.filter(
          (o) => o.order !== action.deleteOption.order
        );
        return {
          ...p,
          productOptions: updateProduct,
        };
      }
      return p;
    });
    return {
      ...state,
      products: newProductState,
      callState: LoadingState.LOADED,
    };
  }),

  on(ProductActions.deleteProductOptionFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  }))
);
