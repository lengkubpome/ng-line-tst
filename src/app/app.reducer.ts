import { Action, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { InjectionToken } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';

export interface State {
  router: fromRouter.RouterReducerState<any>;
  // [fromProduct.productFeatureKey]: fromProduct.ProductState;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    router: fromRouter.routerReducer,
    // [fromProduct.productFeatureKey]: fromProduct.productReducer,
  }),
});

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
