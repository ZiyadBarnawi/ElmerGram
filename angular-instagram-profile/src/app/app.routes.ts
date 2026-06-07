import {
  CanMatchFn,
  RedirectCommand,
  Router,
  Routes,
  UrlMatcher,
  UrlSegment,
} from '@angular/router';
import { inject } from '@angular/core';

import { profileRoutes } from './pages/profile/routes';
import { UserService } from '@core/services/user.service';
import { ProfileSignupDialogComponent } from '@pages/profile/profile-signup-dialog-component/profile-signup-dialog-component';

const redirectToUnAuthorize: CanMatchFn = (route, segment) => {
  console.log(route, segment);
  const router = inject(Router);
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};
// const deactivate: CanDeactivateFn<ProfileComponent> = ;
export const signupMatcher: UrlMatcher = (segments: UrlSegment[]) => {
  const last = segments[segments.length - 1];
  if (last?.path === 'signup') {
    return { consumed: segments };
  }
  return null;
};
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  {
    path: 'landing',
    pathMatch: 'full',
    loadComponent: () => import('@pages/home/home.component').then((m) => m.Home),
    title: 'ElmerGram ',
    loadChildren: (): Routes => [
      {
        path: 'signup',
        pathMatch: 'prefix',
        canDeactivate: [
          (component: ProfileSignupDialogComponent) => {
            if (
              (component.userService as UserService).userForm.touched &&
              (component.userService as UserService).userForm.dirty
            )
              return window.alert("Don't worry. Your data will remain ✨");
            return true;
          },
        ],
        loadComponent: () =>
          import('@pages/profile/profile-signup-dialog-component/profile-signup-dialog-component').then(
            (m) => m.ProfileSignupDialogComponent,
          ),
      },
    ],
  },

  ...(profileRoutes as Routes),
  { path: 'reels', loadComponent: () => import('@pages/reels/reels').then((m) => m.Reels) },
  {
    matcher: signupMatcher,
    component: ProfileSignupDialogComponent,
  },

  {
    path: '**',
    // canActivate: [redirectToUnAuthorize],
    title: 'ElmerGram',

    loadComponent: () =>
      import('@shared/components/not-found-component/not-found-component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
