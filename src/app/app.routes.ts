import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '404',

    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
