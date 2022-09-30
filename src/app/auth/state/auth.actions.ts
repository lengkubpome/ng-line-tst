import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const login = createAction(
  '[Auth] Loging',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Loging Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Loging Failure',
  props<{ errorMessage: string }>()
);

export const signup = createAction(
  '[Auth] Signup',
  props<{ email: string; password: string }>()
);
export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: User }>()
);
export const autoLogin = createAction('[Auth] Auto Login');
