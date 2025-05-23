import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { text } from 'stream/consumers';


 

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointmentId: number | any;
  private doctorId: number | any;



  private  apiUrl = 'http://localhost:8082/api/appointments';
  
 
  constructor(private http: HttpClient) {}
 
  
 
 
  
  bookAppointment(appointmentData: any): Observable<any> {
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token book appointment method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);

    return this.http.post(`${this.apiUrl}/book`, appointmentData, { headers, responseType: 'text' });
  }

  updateAppointment(appointmentData: any): Observable<any> {
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token book appointment method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);

    return this.http.put(`${this.apiUrl}/update`, appointmentData, { headers, responseType: 'text' });
  }

  doCancelAppointment(appointmentId: number): Observable<any>{

    const jwt = localStorage.getItem('access_token');
    
    console.log("jwt token book appointment method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);

    return this.http.delete(`${this.apiUrl}/cancel/${appointmentId}`, { headers, responseType: 'text' });

  }

 
  getPastAppointments(userId: number): Observable<any> {

    const jwt = localStorage.getItem('access_token');
    const role=localStorage.getItem('role');
    console.log("jwt token book appointment method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${this.apiUrl}/${userId}/past`,  { headers });


    
    
  }
  getUpcomingAppointments(userId: number): Observable<any> {

    const jwt = localStorage.getItem('access_token');
    const role=localStorage.getItem('role');
    console.log("jwt token book appointment method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${this.apiUrl}/${userId}/upcoming`, { headers});

    
    
  }

  getTodaysAppointments(userId: number): Observable<any> {

    const jwt = localStorage.getItem('access_token');
    //const role=localStorage.getItem('role');
    console.log("jwt token book appointment method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${this.apiUrl}/${userId}/today`, { headers});

    // console.log(headers);
    // if(role === 'PATIENT'){
    //   return this.http.get(`${this.apiUrl}/patient/${userId}/upcoming`, { headers});

    // }
    // else{
    //   return this.http.get(`${this.apiUrl}/doctor/${userId}/upcoming`, { headers});

    // }
    
  }

  getAppointment(appointmentId: number): Observable<any>{

    const jwt = localStorage.getItem('access_token');
    console.log("jwt token book appointment method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${this.apiUrl}/${appointmentId}`, { headers});


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
