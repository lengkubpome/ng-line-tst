import { Action, createReducer, on } from '@ngrx/store';
import { CallState, LoadingState } from '@shared/models/call-state';
import { User } from '../models/user.model';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | null;
  callState: CallState;
}

export const initialState: AuthState = {
  user: null,
  callState: LoadingState.INIT,
};

export const reducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),

  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    user: action.user,
    callState: LoadingState.LOADED,
  })),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  })),
  on(AuthActions.signup, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),

  on(AuthActions.signupSuccess, (state, action) => ({
    ...state,
    user: action.user,
    callState: LoadingState.LOADED,
  }))
);
