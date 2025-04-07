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

interface ConsultationDAO{
  appointmentId: number;
  consultationId: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  appointmentDate: string;
  timeSlot: string;
  notes: string;
  prescription: string;


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
  patientid: number | null = null;
  consultations : ConsultationDAO[]=[];
  selectedConsultation: ConsultationDAO | null=null ;
  showConsultationModal = false;
  showMedicalHistoryModal = false;



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
        this.loadConsultations();
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

  loadConsultations() {
   
    if (this.patientid !== null) {
      const patientId = this.patientid;
      this.consultationService.getConsultations(patientId).subscribe(
        (response: ConsultationDAO[]) => {
          this.consultations = response;
        },
        err => console.error('Error loading consultations:', err)
      );
    } else {
      console.error('Patient ID not found in local storage.');
    }
  }
  
  
  openConsultation(consultation: ConsultationDAO) {
    this.selectedConsultation = consultation;
    this.showConsultationModal = true;
  }

  viewMedicalHistory() {
    this.showMedicalHistoryModal = true;
  }

  closeModal() {
    this.showConsultationModal = false;
    this.showMedicalHistoryModal = false;
  }


  viewConsultation(appointmentId: number) {
    this.consultationService.getConsultationByAppointmentId(appointmentId).subscribe(data => {
      this.selectedConsultation = data;
      this.showConsultationModal = true;
    });
  }


  bookAppointment() {
    this.router.navigate(['patient/appointments/book']);
  }


  // viewMedicalHistory() {
  //   // Implement viewMedicalHistory logic
  //   console.log('Viewing medical history');
  // }

  updateAppointment(appointmentId: number, doctorId: number) {
    // Implement updateAppointment logic
    console.log(`Updating appointment with ID: ${appointmentId}`);
    console.log(`Updating appointment with doctor ID: ${doctorId}`); 
    
    this.appointmentService.setAppointmentId(appointmentId);
    this.appointmentService.setDoctorId(doctorId);

    this.router.navigate(['patient/appointments/update']);

  }

  cancelAppointment(appointmentId: number) {
    
    const confirmation = confirm('Are you sure you want to cancel this appointment?');
    if(confirmation){
    this.appointmentService.doCancelAppointment(appointmentId).subscribe(
      (response) => {
        alert(response+"Appointment cancelled successfully");
        this.router.navigate(['/patient/dashboard']);
      },
      err => {console.error('Error cancelling appointment:', err);
        
      }

    );
  }
  }

  


}
