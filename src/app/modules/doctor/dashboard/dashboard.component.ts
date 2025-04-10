import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AppointmentService } from '../../shared/services/appointment.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ConsultationService } from '../../shared/services/consultation.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DoctorDashboardComponent {
  todaysAppointments : AppointmentDAO [] = [];
  upcomingAppointments : AppointmentDAO [] = [];
  pastAppointments : AppointmentDAO []=[];
  doctorid: number | null = null;
  showConsultationModal = false;
  showMedicalHistoryModal = false;
  showConsultationButton = false;
  showAddConsultationButton = false;
  selectedConsultation: ConsultationDAO | null=null;
  consultations : ConsultationDAO [] = [];
  selectedAppointment: any;
  showAddConsultationModal=false;
  showPatientInfoModal=false;
  showDoctorConsultationsModal=false;
  
  patientInfo = {
      patientId: '',
      patientName: ''
    };
   patientConsultations :ConsultationDAO[] =[];
  
  
consultation = {
      notes: '',
      prescription: ''
    };
  

  constructor(private appointmentService: AppointmentService,
    private consultationService: ConsultationService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    

    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('user_id');
      const jwt = localStorage.getItem('access_token');

      console.log("User ID while booking:", userId);
      console.log("JWT token while booking:", jwt);

      if (userId && jwt) {
        this.doctorid = +userId;
        this.getTodaysAppointments();
        this.getUpcomingAppointments();
        this.getPastAppointments();
        this.getDoctorConsutations();
      } else {
        console.error('User ID or JWT token not found in local storage.');
      }
    }
  }

  getTodaysAppointments() {

    if (this.doctorid !== null) {
      const doctorId = this.doctorid;
      this.appointmentService.getTodaysAppointments(doctorId).subscribe(
        (data: AppointmentDAO[]) => {
          console.log(data);
          this.todaysAppointments = data;
        },
        error => {
          console.error('Error fetching todays appointments:', error);
        }
      );
    }
  }

  getUpcomingAppointments() {
    if (this.doctorid !== null) {
      const doctorId = this.doctorid;
      this.appointmentService.getUpcomingAppointments(doctorId).subscribe(
        (data: AppointmentDAO[]) => {
          this.upcomingAppointments = data;
        },
        error => {
          console.error('Error fetching upcoming appointments:', error);
        }
      );
    }
  }

  getPastAppointments() {
    if (this.doctorid !== null) {
      const doctorId = this.doctorid;
      this.appointmentService.getPastAppointments(doctorId).subscribe(
        (data: AppointmentDAO[]) => {
          this.pastAppointments = data;
        },
        err => console.error('Error fetching past appointments:', err)
        
      );
    }
  }

  getDoctorConsutations(){
    if (this.doctorid !== null) {
      const doctorId = this.doctorid;
      this.consultationService.getDoctorConsultations(doctorId).subscribe(
        (response: ConsultationDAO[]) => {
          console.log(response);
          this.consultations = response;
        },
        err => console.error('Error loading consultations:', err)
      );
    } else {
      console.error('Patient ID not found in local storage.');
    }
  }

  

  manageAvailability() {
    this.router.navigate(['doctor/availability']);
  }

  viewConsultations() {
  this.showDoctorConsultationsModal=true;
  }

  openPatientInfoModal(){
    this.showPatientInfoModal=true;
  }

  

  
submitConsultation() {
  
      const consultationData = {
        appointmentId: this.selectedAppointment.appointmentId,
        //doctorId: this.selectedAppointment.doctorId,
        notes: this.consultation.notes,
        prescription: this.consultation.prescription
      };
     console.log(consultationData);
  
      this.consultationService.addConsultation(consultationData).subscribe(response => {
        // Handle the response, e.g., update the appointment status
       // this.selectedAppointment.consultationAdded = true;
        //this.selectedAppointment.consultation = consultationData;
        alert("Consultation added successfully");
        // Reset the form and close the modal
        this.consultation = { notes: '', prescription: '' };
        this.closeModal();
        this.cdr.detectChanges();
      }, error => {
        // Handle the error
        console.error('Error adding consultation:', error);
      });
    }
  
  
submitPatientInfo() {
      // Close the first modal
      this.showPatientInfoModal = false;
  
      // Fetch patient consultations
      this.consultationService.getConsultations(+this.patientInfo.patientId).subscribe(response => {
        this.patientConsultations = response;
        // Open the second modal
        this.showMedicalHistoryModal = true;
    this.patientInfo = { patientId: '', patientName: '' };
      }, error => {
        console.error('Error fetching patient consultations:', error);
      });
    }
  

  viewConsultation(appointmentId: number) {
    this.consultationService.getConsultationByAppointmentId(appointmentId).subscribe(data => {
      this.selectedConsultation = data;
      this.showConsultationModal = true;
    });
  }

  viewAddConsultation(appointment: any) {
    
    this.selectedAppointment = appointment;
    this.showAddConsultationModal = true

    this.consultationService.setAppointmentId(appointment.appointmentId);
    // Logic to view add consultation
  }

  closeModal() {
    this.showConsultationModal = false;
    this.showMedicalHistoryModal = false;
    this.showAddConsultationModal=false;
    this.showPatientInfoModal=false;
    this.showDoctorConsultationsModal=false;
  }

}
