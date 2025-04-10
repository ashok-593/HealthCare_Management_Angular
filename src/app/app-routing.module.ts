import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Components
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { PatientDashboardComponent } from './modules/patient/dashboard/dashboard.component';
import { DoctorDashboardComponent } from './modules/doctor/dashboard/dashboard.component';
import { AppointmentBookingComponent } from './modules/patient/appointment-booking/appointment-booking.component';
import { AuthGuard } from './modules/shared/guards/auth.guard';
import { AppointmentUpdatingComponent } from './modules/patient/appointment-updating/appointment-updating.component';
import { AvailabilityComponent } from './modules/doctor/availability/availability.component';
import { AboutComponent } from './modules/navbar-components/about/about.component';
import { ContactComponent } from './modules/navbar-components/contact/contact.component';
import { HomeComponent } from './modules/home/home.component';

// Define routes
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'patient/appointments/book', component: AppointmentBookingComponent},
  {path: 'patient/appointmets/update', component: AppointmentUpdatingComponent},
  { path: 'patient/dashboard', component: PatientDashboardComponent, canActivate: [AuthGuard] },
  { path: 'doctor/dashboard', component: DoctorDashboardComponent, canActivate: [AuthGuard] },
  { path: 'aboutUs', component: AboutComponent},
  {path: 'contactUs', component: ContactComponent},
  { path: 'home',component: HomeComponent},
  { path: 'doctor/availability',component: AvailabilityComponent},
  { path: '**', redirectTo: 'auth/login' }, // Redirect unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }