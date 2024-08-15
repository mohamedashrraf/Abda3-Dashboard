import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://system.osolna.com/api/users';

  constructor(private http: HttpClient) {}

private getHeaders(): HttpHeaders {
  let token = localStorage.getItem('authToken') || '';

  if (token && !token.startsWith('Bearer ')) {
    token = `Bearer ${token}`;
  }

  return new HttpHeaders({
    'Authorization': token,
    'Accept': 'application/json',
    'Accept-Language': 'ar',
    'App-Version': '11',
    'Device-Name': 'chrome',
    'Device-OS-Version': '13',
    'Device-UDID': '1234',
    'Device-Push-Token': '123456',
    'Device-Type': 'web',
  });
}


getUsers(): Observable<User[]> {
  return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() })
    .pipe(
      tap(response => console.log('API Response:', response.data.data)),
      map(response => response?.data.data || [])
    );
}


  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`, { headers: this.getHeaders() });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, { headers: this.getHeaders() });
  }

  updateUser(userId: string, user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/edit`, user, { headers: this.getHeaders() });
  }

  // deleteUser(userId: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${userId}`, { headers: this.getHeaders() });
  // }

  toggleUserStatus(userId: string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${userId}/toggle-status`, {}, { headers: this.getHeaders() });
  }
}
