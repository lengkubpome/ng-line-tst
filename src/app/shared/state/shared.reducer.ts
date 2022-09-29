import { createReducer, on } from '@ngrx/store';
import { CallState, LoadingState } from '../models/call-state';
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
    callState: LoadingState.LOADING,
  })),

  on(SharedAction.setLoaded, (state) => ({
    ...state,
    callState: LoadingState.LOADED,
  })),

  on(SharedAction.setErrorMessage, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMsg },
  }))
);
