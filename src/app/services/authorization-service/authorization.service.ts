import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(
      'https://entertainment-web-app-backend-2.onrender.com/api/login',
      { email: username, password: password }
    );
  }

  signup(username: string, password: string) {
    return this.http.post(
      'https://entertainment-web-app-backend-2.onrender.com/api/register',
      { email: username, password: password }
    );
  }
}
