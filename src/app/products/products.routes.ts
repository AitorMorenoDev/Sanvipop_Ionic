import {Routes} from "@angular/router";
import {leavePageGuard} from "../guards/leave-page.guard";
import {numericIdGuard} from "../guards/numeric-id.guard";
import {productResolver} from "./resolvers/product.resolver";

export const productsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import ('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./product-form/product-form.page').then(m => m.ProductFormPage),
    canDeactivate: [leavePageGuard]
  },
  {
    path: ':id',
    canActivate: [numericIdGuard],
    resolve: {
     product: productResolver
    },
    loadComponent: () =>
      import('./product-detail/product-detail.page').then(m => m.ProductDetailPage),
    loadChildren: () =>
      import('./product-detail/product-detail.routes').then(m => m.productDetailRoutes),
  },
  {
    path: ':id/edit',
    canActivate: [numericIdGuard],
    canDeactivate: [leavePageGuard],
    resolve: {
      product: productResolver
    },
    loadComponent: () =>
      import('./product-form/product-form.page').then(m => m.ProductFormPage),
  },
];
