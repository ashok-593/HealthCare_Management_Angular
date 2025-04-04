import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../shared/services/appointment.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-patient-dashboard',
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  upcomingAppointments: any[] = [];
  recentConsultations: any[] = [];
 
  constructor(private patientService: AppointmentService) {}
 
  ngOnInit() {
   // this.loadAppointments();
    //this.loadConsultations();
  }
 
  // loadAppointments() {
  //   this.patientService.getAppointments().subscribe({
  //     next: (appointments) => (this.upcomingAppointments = appointments),
  //     error: (err) => console.error(err)
  //   });
  // }
 
  // loadConsultations() {
  //   this.patientService.getConsultations().subscribe({
  //     next: (consultations) => (this.recentConsultations = consultations),
  //     error: (err) => console.error(err)
  //   });
  // }
}
 