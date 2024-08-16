import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ field, password }) =>
        this.authService.login(field, password).pipe(
          map(response => {
            const token = response.data?.token;
            if (token) {
              this.authService.storeToken(`Bearer ${token}`);
              return loginSuccess({ token });
            } else {
              throw new Error('User not found');
            }
          }),
          catchError(error => of(loginFailure({ error: 'User not found' })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate(['/users']))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
