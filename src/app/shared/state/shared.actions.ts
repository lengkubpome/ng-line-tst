import { createAction, props } from '@ngrx/store';

export const setLoading = createAction('[Share] set loading');

export const setLoaded = createAction('[Share] set loaded');

export const setErrorMessage = createAction(
  '[Share] set error message',
  props<{ errorMsg: string }>()
);
