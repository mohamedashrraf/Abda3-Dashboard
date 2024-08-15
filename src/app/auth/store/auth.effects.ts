import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ field, password }) =>
        this.authService.login(field, password).pipe(
          map(response => {
            console.log('Login Response:', response.data);

            const token = response.data.token;
            console.log('Extracted Token:', token);

            if (token) {
              this.authService.storeToken(`Bearer ${token}`);
            }

            return loginSuccess({ token });
          }),
          catchError(error => {
            console.error('Login Error:', error); 
            return of(loginFailure({ error }));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
