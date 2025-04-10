import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { PatientDashboardComponent } from './modules/patient/dashboard/dashboard.component';
import { DoctorDashboardComponent } from './modules/doctor/dashboard/dashboard.component';
import { Component } from '@angular/core';
import { AppointmentBookingComponent } from './modules/patient/appointment-booking/appointment-booking.component';
import { ConsultationRecordsComponent } from './modules/patient/consultation-records/consultation-records.component';
import { AppointmentUpdatingComponent } from './modules/patient/appointment-updating/appointment-updating.component';
import { availableParallelism } from 'node:os';
import { AvailabilityComponent } from './modules/doctor/availability/availability.component';
import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/navbar-components/about/about.component';
import { ContactComponent } from './modules/navbar-components/contact/contact.component';

export const routes: Routes = [
     { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/register', component: RegisterComponent },
      {path: 'patient/appointments/book', component: AppointmentBookingComponent},
      {path: 'patient/appointments/update', component: AppointmentUpdatingComponent},
      {path: 'patient/consultations', component: ConsultationRecordsComponent},
      { path: 'patient/dashboard',component: PatientDashboardComponent},
      { path: 'doctor/dashboard',component:DoctorDashboardComponent },
      { path: 'doctor/availability', component: AvailabilityComponent},
      { path: 'home', component: HomeComponent},
      { path : 'about', component: AboutComponent},
      { path: 'contactUs', component: ContactComponent}

];


