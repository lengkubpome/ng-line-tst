import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const getAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const getToken = createSelector(getAuthState, (state) => {
  return state.userX ? state.userX.uid : null;
});
