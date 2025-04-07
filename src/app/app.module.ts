import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import Components
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { PatientDashboardComponent } from './modules/patient/dashboard/dashboard.component';
import { DoctorDashboardComponent } from './modules/doctor/dashboard/dashboard.component';
import { AppointmentBookingComponent } from './modules/patient/appointment-booking/appointment-booking.component';
import { HeaderComponent } from './modules/header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { AppointmentService } from './modules/shared/services/appointment.service';
import { ConsultationService } from './modules/shared/services/consultation.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PatientDashboardComponent,
    DoctorDashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AppointmentService,
    ConsultationService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }