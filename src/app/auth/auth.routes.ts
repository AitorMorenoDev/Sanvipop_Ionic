import { Routes } from "@angular/router";
import {leavePageGuard} from "../guards/leave-page.guard";

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    canDeactivate: [leavePageGuard],
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage),
  },
];
