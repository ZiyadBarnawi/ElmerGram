import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { profileRoutes } from './pages/profile/routes';

const redirectToUnAuthorize: CanMatchFn = (route, segment) => {
  console.log(route, segment);
  const router = inject(Router);
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};
// const deactivate: CanDeactivateFn<ProfileComponent> = ;

export const routes: Routes = [
  // {
  //   path: '/',
  //   pathMatch: 'full',
  //   loadComponent: () => import('@pages/home/home.component').then((m) => m.Home),
  //   title: 'ElmerGram ',
  // },
  {
    path: 'landing',
    pathMatch: 'full',
    loadComponent: () => import('@pages/home/home.component').then((m) => m.Home),
    title: 'ElmerGram ',
  },
  ...(profileRoutes as Routes),
  { path: 'reels', loadComponent: () => import('@pages/reels/reels').then((m) => m.Reels) },

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
