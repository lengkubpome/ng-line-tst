import { createReducer, on } from '@ngrx/store';
import { CallState, LoadingState } from './call-state';
import * as SharedAction from './shared.actions';

export const sharedFeatureKey = 'shared';

export interface SharedState {
  callState: CallState;
}

export const initialState: SharedState = { callState: LoadingState.INIT };

export const sharedReducer = createReducer(
  initialState,

  on(SharedAction.setLoading, (state) => ({
    ...state,
    // showLoading: action.status,
    callState: LoadingState.LOADING,
  })),

  on(SharedAction.setLoaded, (state) => ({
    ...state,
    // showLoading: action.status,
    callState: LoadingState.LOADED,
  })),

  on(SharedAction.setErrorMessage, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMsg },
  }))
);
