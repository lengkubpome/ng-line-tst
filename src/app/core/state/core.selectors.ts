import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCore from './core.reducer';

export const selectCoreState = createFeatureSelector<fromCore.State>(
  fromCore.coreFeatureKey
);
