import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getError, LoadingState } from '@shared/models/call-state';
import * as fromCore from './core.reducer';

export const selectCoreState = createFeatureSelector<fromCore.CoreState>(
  fromCore.coreFeatureKey
);

export const selectLoading = createSelector(selectCoreState, (state) => {
  return state.callState === LoadingState.LOADING;
});

export const selectErrorMessage = createSelector(selectCoreState, (state) => {
  getError(state.callState);
});
