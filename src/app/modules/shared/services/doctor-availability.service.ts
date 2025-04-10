
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:8082/api/availability';
 
 
@Injectable({
  providedIn: 'root'
})
export class DoctorAvailabilityService {
 
  constructor(private http: HttpClient) {}

  
  
  setAvailabilities(doctorId:number): Observable<any>{
    const jwt = localStorage.getItem('access_token');
    const doctorid = localStorage.getItem('user_id');

    console.log("jwt token getdoctors method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    //return this.http.post(`${apiUrl}/set/${doctorid}`,{headers , responseType: "text"});
    return this.http.post(`${apiUrl}/set/${doctorid}`, {}, { headers, responseType: 'text' as 'json' });

  }
  
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

  getBlockedDates(doctorId: number): Observable<any>{
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token getAvailability method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.get(`${apiUrl}/blocked/${doctorId}`,{headers});

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

  blockDate(doctorId:number, date:string): Observable<any>{
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token getTimeSlots method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.delete(`${apiUrl}/block/${doctorId}/${date}`, {headers , responseType: "text"});

  }

  unBlockDate(doctorId:number, date:string): Observable<any>{
    const jwt = localStorage.getItem('access_token');
    console.log("jwt token getTimeSlots method",jwt);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`
    });

    console.log(headers);
    return this.http.put(`${apiUrl}/unblock/${doctorId}/${date}`,{}, {headers , responseType: "text"});

  }

}
 
