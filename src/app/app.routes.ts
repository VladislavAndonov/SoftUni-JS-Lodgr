import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { SpacesComponent } from './features/spaces/spaces.component';
import { SpaceDetailsComponent } from './features/spaces/space-details/space-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // User routing
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Features routing
  { path: 'spaces', component: SpacesComponent },
  { path: 'spaces/:id', component: SpaceDetailsComponent },

  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '/404' },
];
