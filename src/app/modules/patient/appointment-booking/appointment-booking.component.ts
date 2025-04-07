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
  // Add other relevant fields
}

interface Availability {
  availableDate: string;
  timeSlots: string[];
}

@Component({
  selector: 'app-appointment-booking',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {
  bookingForm: FormGroup;
  doctors: Doctor[] = [];
  availableDates: string[] = [];
  timeSlots: string[] = [];
  patientid: number | null = null;
  appointmentId: number | any;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private availabilityService: DoctorAvailabilityService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.bookingForm = this.fb.group({
      doctorId: ['', Validators.required],
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
        this.loadDoctors();
      } else {
        console.error('User ID or JWT token not found in local storage.');
      }
    }
  }

  loadDoctors() {
    this.availabilityService.getDoctors().subscribe(
      (response: Doctor[]) => this.doctors = response,
      err => console.error('Error loading doctors:', err)
    );
  }

  onDoctorChange(event: any) {
    const doctorId = +event.target.value; // Convert to number
    this.loadAvailableDates(doctorId);
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
    const doctorId = this.bookingForm.get('doctorId')?.value;
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

  setAppointmentId(id: number) {
    this.appointmentId = id;
  }

  getAppointmentId(): number {
    return this.appointmentId;
  }

  onSubmit() {
    if (this.bookingForm.valid && this.patientid !== null) {
      const formData = {
        ...this.bookingForm.value,
        patientId: this.patientid
      };
      console.log("Form data being sent:", formData);

      this.appointmentService.bookAppointment(formData).subscribe(
        (response) => {
          alert(response+"Appointment booked successfully");
          this.router.navigate(['/patient/dashboard']);
        },
        err => {console.error('Error booking appointment:', err);
          console.error("Form data being sent:", formData);
        }

      );
    }
  }
}
