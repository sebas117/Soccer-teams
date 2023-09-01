import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean>;
  readonly baseURL = 'https://wo-fifa.azurewebsites.net';

  constructor(private http: HttpClient) {
    this.isLoggedIn = new BehaviorSubject<boolean>(
      !!localStorage.getItem('isLogged'),
    );
  }

  login(user: User) {
    return this.http.post(`${this.baseURL}/login`, user, {
      responseType: 'text',
      observe: 'response',
    });
  }

  logout() {
    return this.http.post(
      `${this.baseURL}/logout`,
      {},
      {
        responseType: 'text',
        observe: 'response',
      },
    );
  }
}
