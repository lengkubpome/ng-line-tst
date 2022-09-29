import { Action, createReducer, on } from '@ngrx/store';
import { CallState, LoadingState } from '@shared/models/call-state';
import * as CoreActions from './core.actions';

export const coreFeatureKey = 'core';

export interface CoreState {
  showLoading: boolean;
  callState: CallState;
}

export const initialState: CoreState = {
  showLoading: false,
  callState: LoadingState.INIT,
};

export const coreReducer = createReducer(
  initialState,
  on(CoreActions.setLoading, (state, action) => ({
    ...state,
    // showLoading: action.status,
    callState: LoadingState.LOADING,
  })),
  on(CoreActions.setLoaded, (state) => ({
    ...state,
    // showLoading: action.status,
    callState: LoadingState.LOADED,
  })),

  on(CoreActions.setErrorMessage, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMsg },
  }))
);
