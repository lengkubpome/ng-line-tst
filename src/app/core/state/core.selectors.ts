import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCore from './core.reducer';

export const getCoreState = createFeatureSelector<fromCore.CoreState>(
  fromCore.coreFeatureKey
);

export const getLoading = createSelector(getCoreState, (state) => {
  state.showLoading;
});
