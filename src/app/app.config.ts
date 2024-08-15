import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http'; // Updated import
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { authReducer } from './auth/store/auth.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthInterceptorService } from './services/auth-interceptor.service'; // Import the interceptor service

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi() // Add this line to register interceptors from DI
    ),
    importProvidersFrom(
      ReactiveFormsModule,
      StoreModule.forRoot({ auth: authReducer }), // Configure the store with reducers here
      EffectsModule.forRoot([AuthEffects]), // Include the AuthEffects in the root effects module
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) // Optional for debugging
    ),
  ]
};
