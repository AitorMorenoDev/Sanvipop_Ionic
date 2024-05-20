import { Routes } from '@angular/router';
import {logoutActivateGuard} from "./guards/logout-activate.guard";
import {loginActivateGuard} from "./guards/login-activate.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then( m => m.authRoutes),
    canActivate: [logoutActivateGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.routes').then(m => m.profileRoutes),
    canActivate: [loginActivateGuard],
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.routes').then(m => m.productsRoutes),
    canActivate: [loginActivateGuard],
  },
];
