import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  private appointmentId: number | any;
  private doctorId: number | any;

  private  apiUrl = 'http://localhost:8082/api/consultations';
 
  constructor(private http: HttpClient) {}
 
 

  getConsultationByAppointmentId(appointmentId: number): Observable<any> {
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token book appointment method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${this.apiUrl}/${appointmentId}`,  { headers });
  }

  getConsultations(patientId: number): Observable<any>{
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token local storatge",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${this.apiUrl}/history/${patientId}`,  { headers });

  }

  getDoctorConsultations(doctorId: number): Observable<any>{
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token local storatge",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${this.apiUrl}/doctor/history/${doctorId}`,  { headers });

  }

  addConsultation(consultationData: any): Observable<any> {
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token book appointment method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);

    return this.http.post(`${this.apiUrl}/add`, consultationData, { headers, responseType: 'text' });
  }

  setAppointmentId(id: number) {
    this.appointmentId = id;
  }

  getAppointmentId(): number {
    return this.appointmentId;
  }

  setDoctorId(id: number){
    this.doctorId = id;
  }
  getDoctorId(): number{
    return this.doctorId;
  }
}
