import { Routes } from '@angular/router';

export const productDetailRoutes: Routes = [
  {
    path: 'info',
    loadComponent: () =>
      import('./product-info/product-info.page').then(
        (m) => m.ProductInfoPage
      ),
  },
  {
    path: 'photos',
    loadComponent: () =>
      import('./product-photos/product-photos.page').then(
        (m) => m.ProductPhotosPage
      ),
  },
  {
    path: 'location',
    loadComponent: () =>
      import('./product-location/product-location.page').then(
        (m) => m.ProductLocationPage
      ),
  },
  {
    path: 'saledetails',
    loadComponent: () =>
      import('./product-saledetails/product-saledetails.page').then(
        (m) => m.ProductSaledetailsPage
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'info',
  },
];
