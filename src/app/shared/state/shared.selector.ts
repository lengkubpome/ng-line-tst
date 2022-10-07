import { CallState, getError, LoadingState } from '../models/call-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShared from './shared.reducer';

const selectSharedState = createFeatureSelector<fromShared.SharedState>(
  fromShared.sharedFeatureKey
);

export const selectLoading = createSelector(selectSharedState, (state) => {
  return state.callState === LoadingState.LOADING;
});

export const selectErrorMessage = createSelector(selectSharedState, (state) => {
  getError(state.callState);
});
