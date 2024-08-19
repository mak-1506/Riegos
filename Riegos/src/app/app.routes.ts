import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'customers',
    loadComponent: () => import('./customers/customers.page').then( m => m.CustomersPage)
  },
  {
    path: 'configuration/:id',
    loadComponent: () => import('./configuration/configuration.page').then( m => m.ConfigurationPage)
  },
  {
    path: 'customersadd',
    loadComponent: () => import('./customersadd/customersadd.page').then( m => m.CustomersaddPage)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./gallery/gallery.page').then( m => m.GalleryPage)
  },
];
