import { Routes } from "@angular/router";
import {profileResolver} from "./resolvers/profile.resolver";
import {ownProfileResolver} from "./resolvers/own-profile.resolver";
import {ProfilePage} from "./profile-page/profile.page";


export const profileRoutes: Routes = [
  {
    path: '',
    resolve: {
      product: ownProfileResolver
    },
    component: ProfilePage,
  },
  {
    path: ':id',
    resolve: {
      product: profileResolver
    },
    component: ProfilePage,
  }
];
