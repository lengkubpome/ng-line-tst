import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const selectUser = createSelector(selectAuthState, (state) => {
  return state.user ? state.user : null;
});
export const selectToken = createSelector(selectAuthState, (state) => {
  return state.user ? state.user.uid : null;
});
