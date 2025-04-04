
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
 
import { PatientDashboardComponent } from './dashboard/dashboard.component';
import { AppointmentBookingComponent } from './appointment-booking/appointment-booking.component';
import { ConsultationRecordsComponent } from './consultation-records/consultation-records.component';
 
const routes: Routes = [
  { path: 'dashboard', component: PatientDashboardComponent },
  { path: 'patient/appointments/book', component: AppointmentBookingComponent },
  { path: 'consultations', component: ConsultationRecordsComponent },
];
 
@NgModule({
  declarations: [
    PatientDashboardComponent,
    AppointmentBookingComponent,
    ConsultationRecordsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PatientModule { }
 