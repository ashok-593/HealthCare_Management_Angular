
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:8082/api/availability';
 
 
@Injectable({
  providedIn: 'root'
})
export class DoctorAvailabilityService {
 
  constructor(private http: HttpClient) {}
 
  
  getDoctors(): Observable<any> {
    return this.http.get(`${apiUrl}/doctors`);
  }

  getAvailableDates(doctorId: number): Observable<any> {
    return this.http.get(`${apiUrl}/doctor/${doctorId}`);
  }

  getTimeSlots(doctorId: number, date: String): Observable<any> {
    return this.http.get(`${apiUrl}/${doctorId}/${date}`);
  }

}
 
