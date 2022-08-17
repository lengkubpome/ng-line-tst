import { Action, createReducer, on } from '@ngrx/store';
import * as CoreActions from './core.actions';

export const coreFeatureKey = 'core';

export interface CoreState {
  showLoading: boolean;
}

export const initialState: CoreState = {
  showLoading: false,
};

export const coreReducer = createReducer(
  initialState,
  on(CoreActions.setLoading, (state, action) => ({
    ...state,
    showLoading: action.status,
  }))
);
