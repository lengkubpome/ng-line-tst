import { Action, createReducer, on } from '@ngrx/store';
import { CallState, LoadingState } from '@shared/models/call-state';
import { User, User2 } from '../models/user.model';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

const defaultUser = new User('', '', '');

export interface AuthState {
  user: User2 | null;
  userX: User | null;
  callState: CallState;
}

export const initialState: AuthState = {
  user: null,
  userX: null,
  callState: LoadingState.INIT,
};

export const reducer = createReducer(
  initialState,

  on(AuthActions.getUser, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(AuthActions.emailSignIn, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(AuthActions.authenticated, (state, action) => ({
    ...state,
    userX: { ...action.user },
    callState: LoadingState.LOADED,
  })),
  on(AuthActions.notAuthenticated, (state, action) => ({
    ...state,
    userX: defaultUser,
    callState: LoadingState.LOADED,
  })),
  on(AuthActions.signUp, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(AuthActions.signOut, (state, action) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),

  // ===================== End New
  on(AuthActions.login2, (state) => ({
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

  on(AuthActions.signupSuccess, (state, action) => ({
    ...state,
    user: action.user,
    callState: LoadingState.LOADED,
  })),
  on(AuthActions.autoLogout, (state, action) => ({
    ...state,
    user: null,
  }))
);
