import { CheckComponent } from './Pages/check/check.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { ReservationComponent } from './Pages/reservation/reservation.component';
import { AboutComponent } from './Pages/about/about.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { SigninComponent } from './Auth/signin/signin.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'check', component: CheckComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: HomeComponent },
];
