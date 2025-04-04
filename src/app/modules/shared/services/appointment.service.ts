import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:8082/api/patient/book';
 
 
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
 
  constructor(private http: HttpClient) {}
 
  // getAppointments(): Observable<any> {
  //   return this.http.get(`${apiUrl}/appointments`);
  // }
 
 
  bookAppointment(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/appointments/book`, data);
  }
}
 