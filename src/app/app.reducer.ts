import { Action, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { InjectionToken } from '@angular/core';
import * as fromCore from './core/state';
import * as fromShared from './shared/state';
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  router: fromRouter.RouterReducerState<any>;
  [fromCore.coreFeatureKey]: fromCore.CoreState;
  [fromShared.sharedFeatureKey]: fromShared.SharedState;
  // [fromProduct.productFeatureKey]: fromProduct.ProductState;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<AppState, Action>
>('Root reducers token', {
  factory: () => ({
    [fromCore.coreFeatureKey]: fromCore.coreReducer,
    [fromShared.sharedFeatureKey]: fromShared.sharedReducer,
    router: fromRouter.routerReducer,
    // [fromProduct.productFeatureKey]: fromProduct.productReducer,
  }),
});

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
