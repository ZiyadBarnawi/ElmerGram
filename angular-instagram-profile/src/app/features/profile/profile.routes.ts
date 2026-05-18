import { Routes } from '@angular/router';

import { resolveRouteData, resolveTitle } from './profile.component';
import { ProfileSignupDialogComponent } from './components/profile-signup-dialog-component/profile-signup-dialog-component';

export const profileRoutes: Routes = [
  {
    path: 'profile',
    pathMatch: 'full',
    redirectTo: 'profile/Ziyad',
  },
  {
    path: 'profile/:username',
    pathMatch: 'prefix',
    loadComponent: () => import('./profile.component').then((m) => m.ProfileComponent),
    title: resolveTitle,
    data: { text: "I'm a static route text!✨" },
    runGuardsAndResolvers: 'always',
    resolve: {
      text: resolveRouteData,
    },
    loadChildren: (): Routes => [
      {
        path: 'edit',
        pathMatch: 'prefix',
        loadComponent: () =>
          import('./components/profile-edit-dialog-component/profile-edit-dialog-component').then(
            (m) => m.ProfileEditDialogComponent,
          ),
      },
      {
        path: 'signup',
        canDeactivate: [
          (component: ProfileSignupDialogComponent) => {
            if (component.userService.userForm.touched && component.userService.userForm.dirty)
              return window.alert("Don't worry. Your data will remain ✨");
            return true;
          },
        ],
        pathMatch: 'prefix',
        loadComponent: () =>
          import('./components/profile-signup-dialog-component/profile-signup-dialog-component').then(
            (m) => m.ProfileSignupDialogComponent,
          ),
      },
      {
        path: 'delete',
        pathMatch: 'prefix',
        loadComponent: () =>
          import('./components/profile-delete-dialog-component/profile-delete-dialog-component').then(
            (m) => m.ProfileDeleteDialogComponent,
          ),
      },
    ],
  },
];
