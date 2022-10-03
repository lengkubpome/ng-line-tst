import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const getToken = createSelector(selectAuthState, (state) =>
  state.user ? state.user.userToken : null
);
