import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import * as UsersActions from './users.actions';

export interface UsersState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: any;
}

export const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UsersActions.deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== userId),
    loading: false,
    error: null,
  })),
  on(UsersActions.toggleUserStatusSuccess, (state, { userId, active }) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === userId ? { ...user, active } : user
    ),
    loading: false,
    error: null,
  })),
  on(UsersActions.loadUserByIdSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    loading: false,
    error: null,
  })),
  on(UsersActions.createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false,
    error: null,
  })),
  on(UsersActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
    loading: false,
    error: null,
  })),
  on(
    UsersActions.loadUsersFailure,
    UsersActions.deleteUserFailure,
    UsersActions.toggleUserStatusFailure,
    UsersActions.loadUserByIdFailure,
    UsersActions.createUserFailure,
    UsersActions.updateUserFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  )
);
