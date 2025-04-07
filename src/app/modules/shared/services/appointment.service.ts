import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { text } from 'stream/consumers';


 

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


  private  apiUrl = 'http://localhost:8082/api/appointments';
 
  constructor(private http: HttpClient) {}
 
  // getAppointments(): Observable<any> {
  //   return this.http.get(`${apiUrl}/appointments`);
  // }
 
 
  
  bookAppointment(appointmentData: any): Observable<any> {
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token book appointment method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);

    return this.http.post(`${this.apiUrl}/book`, appointmentData, { headers, responseType: 'text' });
  }

 
  getPastAppointments(patientId: number): Observable<any> {

    const jwt = localStorage.getItem('access_token');
    console.log("jwt token book appointment method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${this.apiUrl}/patient/${patientId}/past`,  { headers });
  }
  getUpcomingAppointments(patientId: number): Observable<any> {

    const jwt = localStorage.getItem('access_token');
    console.log("jwt token book appointment method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${this.apiUrl}/patient/${patientId}/upcoming`, { headers});
}
}
