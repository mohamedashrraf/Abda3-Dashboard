import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.routes').then(m => m.usersRoutes)
  },
  // { path: '**', redirectTo: 'auth' }
];
