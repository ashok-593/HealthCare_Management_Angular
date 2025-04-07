import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AppointmentService } from '../../shared/services/appointment.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ConsultationService } from '../../shared/services/consultation.service';
import { Router } from '@angular/router';

interface AppointmentDAO {
  appointmentId: number;
  doctorId: number;
  doctorName: string;
  patientId: number;
  patientName: string;
  appointmentDate: string;
  timeSlot: string;
  appointmentStatus: string;
}

@Component({
  selector: 'app-patient-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  upcomingAppointments: AppointmentDAO[] = [];
  pastAppointments: AppointmentDAO[] = [];
  showConsultationModal = false;
  selectedConsultation: any = null;
  patientid: number | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private consultationService: ConsultationService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('user_id');
      const jwt = localStorage.getItem('access_token');

      console.log("User ID while booking:", userId);
      console.log("JWT token while booking:", jwt);

      if (userId && jwt) {
        this.patientid = +userId;
        this.fetchUpcomingAppointments();
        this.fetchPastAppointments();
      } else {
        console.error('User ID or JWT token not found in local storage.');
      }
    }
  }

  fetchUpcomingAppointments() {
    if (this.patientid !== null) {
      const patientId = this.patientid;
      this.appointmentService.getUpcomingAppointments(patientId).subscribe(
        (data: AppointmentDAO[]) => {
          this.upcomingAppointments = data;
        },
        error => {
          console.error('Error fetching upcoming appointments:', error);
        }
      );
    }
  }

  fetchPastAppointments() {
    if (this.patientid !== null) {
      const patientId = this.patientid;
      this.appointmentService.getPastAppointments(patientId).subscribe(
        (data: AppointmentDAO[]) => {
          this.pastAppointments = data;
        },
        err => console.error('Error fetching past appointments:', err)
        
      );
    }
  }

  viewConsultation(appointmentId: number) {
    this.consultationService.getConsultationByAppointmentId(appointmentId).subscribe(data => {
      this.selectedConsultation = data;
      this.showConsultationModal = true;
    });
  }

  closeModal() {
    this.showConsultationModal = false;
    this.selectedConsultation = null;
  }

  bookAppointment() {
    this.router.navigate(['patient/appointments/book']);
  }
  viewAvailability() {
    // Implement viewAvailability logic
    console.log('Viewing doctor availability');
  }

  viewMedicalHistory() {
    // Implement viewMedicalHistory logic
    console.log('Viewing medical history');
  }

  updateAppointment(appointmentId: number) {
    // Implement updateAppointment logic
    console.log(`Updating appointment with ID: ${appointmentId}`);
  }

  cancelAppointment(appointmentId: number) {
    // Implement cancelAppointment logic
    console.log(`Cancelling appointment with ID: ${appointmentId}`);
  }
}
