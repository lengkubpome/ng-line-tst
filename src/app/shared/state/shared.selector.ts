import { CallState, getError, LoadingState } from './call-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShared from './shared.reducer';

const getSharedState = createFeatureSelector<fromShared.SharedState>(
  fromShared.sharedFeatureKey
);

export const getLoading = createSelector(getSharedState, (state) => {
  return state.callState === LoadingState.LOADING;
});

export const getErrorMessage = createSelector(getSharedState, (state) => {
  getError(state.callState);
});
