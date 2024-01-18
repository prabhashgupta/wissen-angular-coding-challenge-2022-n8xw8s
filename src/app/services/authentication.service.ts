import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
  }

  // modify the return type to properly use the full response
  login(username: string, password: string): void {
    // implement here
    this.http
      .post('https://reqres.in/api/login', { email: username, password })
      .subscribe({
        next: (res) => {
          console.log('login success!', res);
          if (res['token']) {
            this.headers.append('Authorization', `Bearer ${res['token']}`);
            this.headers.append('Content-type', `application/json`);
            this.http.get('https://reqres.in/api/unknown', { headers: this.headers }).subscribe({
              next: (res1) => {
                console.log(res1['data']);
              },
              error: (error) => {
                console.log(error);
              }
            });
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
