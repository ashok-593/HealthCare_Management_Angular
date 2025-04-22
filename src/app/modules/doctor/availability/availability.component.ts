import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DoctorAvailabilityService } from '../../shared/services/doctor-availability.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { response } from 'express';
import { FormsModule } from '@angular/forms';

interface Availability {
  availableDate: string;
  timeSlots: string[];
}

@Component({
  selector: 'app-availability',
  imports: [CommonModule, FormsModule],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css'
})
export class AvailabilityComponent {

showUnBlockedModal=false;
showBlockAvailabilityModal = false;
showBlockConformition=false;
showUnBlockConformition=false;
  selectedDate: string | null=null;
  availableDates: string[] = []; // Populate this with available dates
  doctorid: number | null=null;
  blockedDates: string[] = [];

  constructor(private availabilityService: DoctorAvailabilityService,
  private router: Router,
  @Inject(PLATFORM_ID) private platformId: Object
) {}

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    const userId = localStorage.getItem('user_id');
    const jwt = localStorage.getItem('access_token');

    console.log("user id while booking:", userId);
    console.log("jwt token while booking:", jwt);

    if (userId && jwt) {
      this.doctorid = +userId;
      
    } else {
      console.error('User ID or JWT token not found in local storage.');
    }
  }
}

goToDashboard(){
  this.router.navigate(['doctor/dashboard']);
}

blockAvailabilityModal(){
  this.showBlockConformition=true;
}

unBlockAvailabilityModal(){
  this.showUnBlockConformition=true;
}


  SetAvailability() {
  const confirmation = confirm('Are you sure you want to set availability for next 7 days ?');
      const doctorId = this.doctorid;
      // Fetch available dates from the service
  console.log("doctorId:"+ doctorId);
    if(doctorId!=null && confirmation){
      this.availabilityService.setAvailabilities(doctorId).subscribe(response => {
              alert(response);
            }, error => {
              console.error('Error fetching available dates:', error);
        });
    }
    else{
      console.log("Invalid doctorId or not confirmed");
    }
  }

  BlockAvailabilityModal() {
    this.loadAvailableDates();
    this.showBlockAvailabilityModal = true;
    
  }

  UnblockAvailabilityModal() {

  this.loadBlockedDates();
  this.showUnBlockedModal=true;
  }


  closeModal() {
    this.showBlockAvailabilityModal = false;
    this.showUnBlockedModal=false;
    this.showBlockConformition=false;
    this.showUnBlockConformition=false;

  }

  loadAvailableDates() {
    const doctorId = this.doctorid;
    // Fetch available dates from the service
  if(doctorId!=null){
    this.availabilityService.getAvailableDates(doctorId).subscribe(
      (response: Availability[]) => {
        this.availableDates = response.map(availability => availability.availableDate);
      },
      err => console.error('Error loading available dates:', err)
    );
  }
  else{
    console.log("Invalid doctorId");
  }
    
  }

loadBlockedDates() {
  const doctorId = this.doctorid;
    // Fetch available dates from the service
if(doctorId!=null){
  this.availabilityService.getBlockedDates(doctorId).subscribe(
    (response: Availability[]) => {
      this.blockedDates = response.map(availability => availability.availableDate);
    },
    err => console.error('Error loading blocked dates:', err)
  );
}
else{
  console.log("Invalid doctorId");
}
    
  }

  blockAvailability() {
  const doctorId = this.doctorid;
  const date = this.selectedDate;
  // const confirmation = confirm('Are you sure you want to Block this date?');
  if(doctorId !=null && date!=null ){
    this.availabilityService.blockDate(doctorId,date).subscribe(response => {
            // Handle the response, e.g., update the UI
            console.log('Date blocked:' +  response);
            alert(response);
            this.closeModal();
            window.location.reload(); // Reload the page to reflect changes
          }, error => {
            console.error('Error blocking date:', error);
          });
  }
  else{
    console.log("Invalid Doctor or invalid Date");
  }
    
  }

unBlockAvailability() {
     const doctorId = this.doctorid;
  const date = this.selectedDate;
  // const confirmation = confirm('Are you sure you want to unBlock that Date?');
  if(doctorId !=null && date!=null ){
    this.availabilityService.unBlockDate(doctorId,date).subscribe(response => {
            // Handle the response, e.g., update the UI
            console.log('Date Unblocked:'+ response);
      alert(response);
            this.closeModal();
            window.location.reload(); // Reload the page to reflect changes
          }, error => {
            console.error('Error unBlocking date:', error);
          });
  }
  else{
    console.log("Invalid Doctor or invalid Date");
  }


}
}
