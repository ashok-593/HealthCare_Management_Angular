import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const apiUrl = 'http://localhost:8082/api/users';

interface LoginResponse {
  user: any;
  accessToken: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
   // Change this to your backend URL

  
  loggedIn = new EventEmitter<boolean>();
  constructor(private http: HttpClient) {}
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${apiUrl}/login`, credentials).pipe(
      tap((response) => {
        console.log('User ID:', response.user.userId);
        console.log("jwt token",response.accessToken);
        
        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('user_id', response.user.userId);
        localStorage.setItem('role',response.user.role);
        console.log("local Storage token : ",localStorage.getItem('access_token'));
        this.loggedIn.emit(true);
      })
    );
  }

  register(userData: { name: string; email: string;phone: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${apiUrl}/register`, userData);
  }

 

  
}