import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const getAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const getUser2 = createSelector(getAuthState, (state) => {
  return state.user ? state.user : null;
});
export const getToken = createSelector(getAuthState, (state) => {
  return state.user ? state.user.uid : null;
});
