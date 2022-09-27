import { createAction, props } from '@ngrx/store';

export const setLoading = createAction('[Core] set loading');

export const setLoaded = createAction('[Core] set loaded');

export const setErrorMessage = createAction(
  '[Core] set error message',
  props<{ errorMsg: string }>()
);
