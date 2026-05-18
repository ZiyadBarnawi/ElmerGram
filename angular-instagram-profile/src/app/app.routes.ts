import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { profileRoutes } from './features/profile/profile.routes';

const redirectToUnAuthorize: CanMatchFn = (route, segment) => {
  console.log(route, segment);
  const router = inject(Router);
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};
// const deactivate: CanDeactivateFn<ProfileComponent> = ;

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home.component').then((m) => m.Home),
    title: 'ElmerGram ',
  },
  ...(profileRoutes as Routes),

  {
    path: '**',
    // canActivate: [redirectToUnAuthorize],
    title: 'ElmerGram',

    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
