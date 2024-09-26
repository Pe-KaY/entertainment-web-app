import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
];
