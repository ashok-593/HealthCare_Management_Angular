
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:8082/api/availability';
 
 
@Injectable({
  providedIn: 'root'
})
export class DoctorAvailabilityService {
 
  constructor(private http: HttpClient) {}

  
 
  
  getDoctors(): Observable<any> {
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token getdoctors method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${apiUrl}/doctors`,{headers});
  }

  getAvailableDates(doctorId: number): Observable<any> {
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token getAvailability method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${apiUrl}/${doctorId}`,{headers});
  }

  getTimeSlots(doctorId: number, date: String): Observable<any> {
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token getTimeSlots method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${apiUrl}/${doctorId}/${date}`,{headers});
  }

}
 
