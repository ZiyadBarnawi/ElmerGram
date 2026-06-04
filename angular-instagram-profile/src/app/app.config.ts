import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import '@angular/compiler';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { CustomLaraPreset } from './customeLara.preset';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { UserService } from './core/services/user.service';
import { Observable } from 'rxjs';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './store/counter';
import { userReducer } from './store/user';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  // TIP: Providing services here means they'll be in the initial bundle. using @injectable doesn't have this behavior
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      inputVariant: 'filled',
      theme: {
        preset: CustomLaraPreset,
      },
      ripple: true,
    }),
    UserService,
    MessageService,
    provideHttpClient(
      withInterceptors([
        // TIP: this is like a middleware in the request pipeline
        (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> => {
          console.log(`Interceptor: ${request.method} Request to ${request.url}`);
          return next(request);
        },
      ]),
    ),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(), // TIP:  returns a config object that would sets inputs() to the current dynamic url part
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
    ),
    //TIP: NgRx global store
    provideStore({ counter: counterReducer, user: userReducer }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
  ],
};
