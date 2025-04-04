import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Components
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { PatientDashboardComponent } from './modules/patient/dashboard/dashboard.component';
import { DoctorDashboardComponent } from './modules/doctor/dashboard/dashboard.component';
import { AppointmentBookingComponent } from './modules/patient/appointment-booking/appointment-booking.component';
import { AuthGuard } from './modules/shared/guards/auth.guard';

// Define routes
const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'patient/appointments/book', component: AppointmentBookingComponent}
  { path: 'patient/dashboard', component: PatientDashboardComponent, canActivate: [AuthGuard] },
  { path: 'doctor/dashboard', component: DoctorDashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth/login' }, // Redirect unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }