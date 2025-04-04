import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../shared/services/appointment.service';
import { DoctorAvailabilityService } from '../../shared/services/doctor-availability.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-appointment-booking',
  imports: [CommonModule , ReactiveFormsModule , HttpClientModule],
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {
  bookingForm: FormGroup;
  doctors: any[] = [];
  availableDates: string[] = [];
  timeSlots: string[] = [];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private availabilityService: DoctorAvailabilityService,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      doctorId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      timeSlot: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.availabilityService.getDoctors().subscribe(
      response => this.doctors = response,
      err => console.error(err)
    );
  }

  onDoctorChange(event: any) {
    const doctorId = +event.target.value; // Convert to number
    this.loadAvailableDates(doctorId);
  }

  loadAvailableDates(doctorId: number) {
    this.availabilityService.getAvailableDates(doctorId).subscribe(
      response => {
        this.availableDates = response.map((availability: any) => availability.availableDate);
      },
      err => console.error(err)
    );
  }

  onDateChange(event: any) {
    const selectedDate = event.target.value;
    const doctorId = this.bookingForm.get('doctorId')?.value;
    this.loadTimeSlots(doctorId, selectedDate);
  }

  loadTimeSlots(doctorId: number, selectedDate: string) {
    this.availabilityService.getAvailableDates(doctorId).subscribe(
      response => {
        const availability = response.find((avail: any) => avail.availableDate === selectedDate);
        this.timeSlots = availability ? availability.timeSlots : [];
      },
      err => console.error(err)
    );
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.appointmentService.bookAppointment(this.bookingForm.value).subscribe(
        () => this.router.navigate(['/patient/dashboard']),
        err => console.error(err)
      );
    }
  }
}
