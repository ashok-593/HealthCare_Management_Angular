import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { PatientDashboardComponent } from './modules/patient/dashboard/dashboard.component';
import { DoctorDashboardComponent } from './modules/doctor/dashboard/dashboard.component';
import { Component } from '@angular/core';
import { AppointmentBookingComponent } from './modules/patient/appointment-booking/appointment-booking.component';
import { ConsultationRecordsComponent } from './modules/patient/consultation-records/consultation-records.component';

export const routes: Routes = [
     { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/register', component: RegisterComponent },
      {path: 'patient/appointments/book', component: AppointmentBookingComponent},
      {path: 'patient/consultations', component: ConsultationRecordsComponent},
      { path: 'patient/dashboard',component: PatientDashboardComponent},
      { path: 'doctor/dashboard',component:DoctorDashboardComponent }

];


