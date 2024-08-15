import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as fromUsers from '../../users/store/users.reducer';

export interface AppState {
  auth: fromAuth.AuthState; 
  users: fromUsers.UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  users: fromUsers.usersReducer,
};
