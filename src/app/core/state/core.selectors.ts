import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getError, LoadingState } from '@shared/models/call-state';
import * as fromCore from './core.reducer';

export const getCoreState = createFeatureSelector<fromCore.CoreState>(
  fromCore.coreFeatureKey
);

export const getLoading = createSelector(getCoreState, (state) => {
  return state.callState === LoadingState.LOADING;
});

export const getErrorMessage = createSelector(getCoreState, (state) => {
  getError(state.callState);
});
