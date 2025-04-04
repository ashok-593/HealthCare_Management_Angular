import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:8082/api/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   // Change this to your backend URL

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    console.log(apiUrl);
    return this.http.post(`${apiUrl}/login`, credentials,httpOptions);
  }

  register(userData: { name: string; email: string;phone: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${apiUrl}/register`, userData,httpOptions);
  }

  logout() {
    localStorage.removeItem('token');
  }
}