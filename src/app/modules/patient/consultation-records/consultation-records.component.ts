import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../shared/services/appointment.service';
 
@Component({
  selector: 'app-consultation-records',
  templateUrl: './consultation-records.component.html',
  styleUrls: ['./consultation-records.component.css']
})
export class ConsultationRecordsComponent implements OnInit {
  consultations: any[] = [];
 
  constructor(private patientService: AppointmentService) {}
 
  ngOnInit() {
    //this.loadConsultations();
  }
 
  // loadConsultations() {
  //   this.patientService.getConsultations().subscribe({
  //     next: (data) => (this.consultations = data),
  //     error: (err) => console.error(err)
  //   });
  // }
}