import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { SpacesComponent } from './features/spaces/spaces.component';
import { SpaceDetailsComponent } from './features/spaces/space-details/space-details.component';
import { RentSpaceComponent } from './features/rent-space/rent-space.component';
import { AuthGuard } from './guards/auth.guard';
import { EditSpaceComponent } from './features/spaces/edit-space/edit-space.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // User routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Features routes
  { path: 'spaces', 
    children: [
      { path: '', component: SpacesComponent },
      { path: ':id', component: SpaceDetailsComponent },
      { path: ':id/edit', component: EditSpaceComponent }
    ]
  },

  { path: 'rent-space', component: RentSpaceComponent, canActivate: [AuthGuard]},

  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '/404' },
];