import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../shared/services/appointment.service';
import { DoctorAvailabilityService } from '../../shared/services/doctor-availability.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';


interface Doctor {
  doctorId: number;
  name: string;

}

interface Availability {
  availableDate: string;
  timeSlots: string[];
}

interface Appointment{
  appointmentId: number;
  patientId: number;
  patienName: string;
  doctorId: number;
  doctorName: string;
  appointmentDate: string;
  timeSlot: string;
  appointmentStatus: string;
}


@Component({
  selector: 'app-appointment-updating',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './appointment-updating.component.html',
  styleUrl: './appointment-updating.component.css'
})
export class AppointmentUpdatingComponent {
  
    updatingForm: FormGroup;
    doctors: Doctor[] = [];
    availableDates: string[] = [];
    timeSlots: string[] = [];
    appointment: Appointment | null = null;
    patientid: number | null = null;
    doctorId: number | null=null;
    appointmentId: number| null=null;
    
  
    constructor(
      private fb: FormBuilder,
      private appointmentService: AppointmentService,
      private availabilityService: DoctorAvailabilityService,
      private router: Router,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
      this.updatingForm = this.fb.group({
        appointmentId: [{ value: '',  disabled: true }, Validators.required],
        doctorId: [{ value: '', disabled: true }, Validators.required],
        appointmentDate: ['', Validators.required],
        timeSlot: ['', Validators.required]
      });
    }
  
    ngOnInit() {
      if (isPlatformBrowser(this.platformId)) {
        const userId = localStorage.getItem('user_id');
        const jwt = localStorage.getItem('access_token');
  
        console.log("user id while booking:", userId);
        console.log("jwt token while booking:", jwt);
  
        if (userId && jwt) {
          this.patientid = +userId;
         
          this.appointmentId= this.appointmentService.getAppointmentId();
          console.log(this.appointmentId);
         
          //this.loadDoctors();
          this.loadAppointment(this.appointmentId);
          this.doctorId = this.appointmentService.getDoctorId();
          console.log(this.doctorId);
          this.loadAvailableDates(this.doctorId);
        } else {
          console.error('User ID or JWT token not found in local storage.');
        }
      }
    }
  
   
  
    loadAvailableDates(doctorId: number) {
      this.availabilityService.getAvailableDates(doctorId).subscribe(
        (response: Availability[]) => {
          this.availableDates = response.map(availability => availability.availableDate);
        },
        err => console.error('Error loading available dates:', err)
      );
    }
  
    onDateChange(event: any) {
      const selectedDate = event.target.value;
      const doctorId = this.updatingForm.get('doctorId')?.value;
      this.loadTimeSlots(doctorId, selectedDate);
    }
  
    loadTimeSlots(doctorId: number, selectedDate: string) {
      this.availabilityService.getAvailableDates(doctorId).subscribe(
        (response: Availability[]) => {
          const availability = response.find(avail => avail.availableDate === selectedDate);
          this.timeSlots = availability ? availability.timeSlots : [];
        },
        err => console.error('Error loading time slots:', err)
      );
    }

    loadAppointment(appointmentId: number) {
      this.appointmentService.getAppointment(appointmentId).subscribe(
        (response: Appointment) => {
          this.appointment = response;
          console.log(this.appointment.doctorId);
          console.log(this.appointment);
          
          this.updatingForm.patchValue({
            appointmentId: this.appointment.appointmentId,
            doctorId: this.appointment.doctorId,
            appointmentDate: this.appointment.appointmentDate,
            timeSlot: this.appointment.timeSlot
          });
        },
        err => console.error('Error loading appointment:', err)
      );
    }
  
  
    onUpdate() {
      if (this.updatingForm.valid && this.patientid !== null) {
        const formData = {
          ...this.updatingForm.value,
          appointmentId: this.appointmentId,
          doctorId: this.doctorId
        };
        console.log("Form data being sent:", formData);
  
        this.appointmentService.updateAppointment(formData).subscribe(
          (response) => {
            alert(response+" Appointment updated successfully");
            this.router.navigate(['/patient/dashboard']);
          },
          err => {console.error('Error booking appointment:', err);
            console.error("Form data being sent:", formData);
          }
  
        );
      }
    }
  }
  

