import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import Lara from '@primeng/themes/lara';
import '@angular/compiler';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { CustomLaraPreset } from './customeLara.preset';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { UserService } from './core/services/user.service';

export const appConfig: ApplicationConfig = {
  // TIP: Providing services here means they'll be in the initial bundle. using @injectable doesn't have this behavior
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      inputVariant: 'filled',
      theme: {
        preset: CustomLaraPreset,
      },
      // ripple: true,
    }),
    UserService,
    MessageService,
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(), // TIP:  returns a config object that would sets inputs() to the current dynamic url part
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
    ),
  ],
};
