import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonAuthService {

  constructor(private http: HttpClient) { }

  loggedIn = false;

  registerUser(form: any) {
    return this.http.post('https://reporting.lawforall.com/portal/api/auth/register', form.value);
  }

  isAuthonticated() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (localStorage.getItem('token')) {
          this.loggedIn = true;
          resolve(this.loggedIn);
        } else {
          this.loggedIn = false;
          reject();
        }
      }, 800);
    });
  }

  logIn(form: any): Observable<any> {
    return this.http.post('https://reporting.lawforall.com/portal/api/auth/login', form.value);
  }

  logout(token: any): Observable<any> {
    return this.http.post('https://reporting.lawforall.com/portal/api/auth/logout', { 'token': token });
  }
}