import { Action, createReducer, on } from '@ngrx/store';
import { CallState, LoadingState } from '@shared/state/call-state';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  email: string;
  password: string;
  callState: CallState;
}

export const initialState: AuthState = {
  email: '',
  password: '',
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
    callState: LoadingState.LOADED,
  })),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMessage },
  }))
);
