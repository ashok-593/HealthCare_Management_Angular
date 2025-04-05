import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  userId: string;
  name: string;
  phone:String;
  email: string;
  role: string;
}

export interface UserDto {
  // email: string;
  // password: string;

  name: string;
  phone:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8082/api/users';

  constructor(private http: HttpClient) { }

  getUserDetails(userId: number): Observable<User> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    const options = { headers };
    const url = `${this.baseUrl}/${userId}`;
    return this.http.get<User>(url, options);
  }

  updateUser(userId: number, userDto: UserDto): Observable<User> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    const options = { headers };
    const url = `${this.baseUrl}/update/${userId}`;
    return this.http.put<User>(url, userDto, options);
  }
}