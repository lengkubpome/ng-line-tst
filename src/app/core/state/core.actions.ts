import { createAction, props } from '@ngrx/store';

export const setLoading = createAction(
  '[Core] set loading',
  props<{ status: boolean }>()
);
