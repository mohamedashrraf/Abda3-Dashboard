import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list-users/list-users.component').then(m => m.ListUsersComponent)
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./user-profile/user-profile.component').then(m => m.UserProfileComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./create-update-user/create-update-user.component').then(m => m.CreateUpdateUserComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./create-update-user/create-update-user.component').then(m => m.CreateUpdateUserComponent)
  }
];
