import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ userId: string }>()
);

export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ userId: string }>()
);

export const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: any }>()
);

export const toggleUserStatus = createAction(
  '[Users] Toggle User Status',
  props<{ userId: string }>()
);

export const toggleUserStatusSuccess = createAction(
  '[Users] Toggle User Status Success',
  props<{ userId: string; active: boolean }>()
);

export const toggleUserStatusFailure = createAction(
  '[Users] Toggle User Status Failure',
  props<{ error: any }>()
);

export const loadUserById = createAction(
  '[Users] Load User By ID',
  props<{ userId: string }>()
);

export const loadUserByIdSuccess = createAction(
  '[Users] Load User By ID Success',
  props<{ user: User }>()
);

export const loadUserByIdFailure = createAction(
  '[Users] Load User By ID Failure',
  props<{ error: any }>()
);

export const createUser = createAction(
  '[Users] Create User',
  props<{ user: User }>()
);

export const createUserSuccess = createAction(
  '[Users] Create User Success',
  props<{ user: User }>()
);

export const createUserFailure = createAction(
  '[Users] Create User Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[Users] Update User',
  props<{ userId: string; user: User }>()
);

export const updateUserSuccess = createAction(
  '[Users] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[Users] Update User Failure',
  props<{ error: any }>()
);
