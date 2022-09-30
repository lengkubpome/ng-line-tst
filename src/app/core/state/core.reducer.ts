import { Action, createReducer, on } from '@ngrx/store';
import { CallState, LoadingState } from '@shared/models/call-state';
import * as CoreActions from './core.actions';

export const coreFeatureKey = 'core';

export interface CoreState {
  callState: CallState;
}

export const initialState: CoreState = {
  callState: LoadingState.INIT,
};

export const coreReducer = createReducer(
  initialState,
  on(CoreActions.setLoading, (state, action) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(CoreActions.setLoaded, (state) => ({
    ...state,
    callState: LoadingState.LOADED,
  })),

  on(CoreActions.setErrorMessage, (state, action) => ({
    ...state,
    callState: { errorMsg: action.errorMsg },
  }))
);
