import { createAction, props } from '@ngrx/store';
import { IUser, User, User2 } from '../models/user.model';

export const getUser = createAction('[Auth] Get User');
export const authenticated = createAction(
  '[Auth] Authenticated',
  props<{ user: User }>()
);
export const notAuthenticated = createAction('[Auth] Not Authenticated');

export const emailSignIn = createAction(
  '[Auth] SignIn With Email & Password',
  props<{ email: string; password: string }>()
);

export const signUp = createAction(
  '[Auth] Signup',
  props<{ email: string; password: string }>()
);

export const signOut = createAction(
  '[Auth] Signout',
  props<{ payload?: any }>()
);
export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ email: string }>()
);

// =============== End New =================

export const login2 = createAction(
  '[Auth] Loging',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Loging Success',
  props<{ user: User2; redirect: boolean }>()
);

export const loginFailure = createAction(
  '[Auth] Loging Failure',
  props<{ errorMessage: string }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: User2; redirect: boolean }>()
);
export const autoLogin = createAction('[Auth] Auto Login');
export const autoLogout = createAction('[Auth] Auto Logout');
