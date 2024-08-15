import { AuthState } from '../auth/store/auth.reducer';
import { UsersState } from '../users/store/users.reducer';

export interface AppState {
  [x: string]: any;
  auth: AuthState;
  users: UsersState;
}
