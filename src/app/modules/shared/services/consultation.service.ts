import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  private  apiUrl = 'http://localhost:8082/api/consultations';
 
  constructor(private http: HttpClient) {}
 
 

  getConsultationByAppointmentId(appointmentId: number) {
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token book appointment method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${this.apiUrl}/${appointmentId}`,  { headers });
  }
}
