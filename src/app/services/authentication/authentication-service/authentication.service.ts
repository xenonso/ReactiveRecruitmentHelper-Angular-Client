import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../../classes/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
    this.loadUserAuthenticationStatus();
  }

  authenticationUri = 'http://localhost:8090/login';
  userData: User;
  userAuthenticationToken: string;

  static createHeader(): Object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  static createUserDataJson(email, password): JSON {
    return JSON.parse(`{"email": "${email}", "password": "${password}"}`);
  }

  authenticateUser(email: string, password: string): Observable<void> {
    const header = AuthenticationService.createHeader();
    const userDataJson = AuthenticationService.createUserDataJson(email, password);

    return this.http
      .post(this.authenticationUri, userDataJson, header)
      .pipe(
        map(result => {
          this.setupUserData(<User> result);
          this.setupUserAuthenticationToken(email, password);
        })
      );
  }

  setupUserData(user: User): void {
    this.userData = user;
    localStorage.setItem('userData', JSON.stringify(this.userData));
  }

  setupUserAuthenticationToken(email: string, password: string): void {
    this.userAuthenticationToken = btoa(`${email}:${password}`); 
    localStorage.setItem('userAuthenticationToken', this.userAuthenticationToken);
  }

  loadUserAuthenticationStatus(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.userAuthenticationToken = localStorage.getItem('userAuthenticationToken');
  }

  logoutUser(): void {
    this.userData = null;
    localStorage.removeItem('userData');
    localStorage.removeItem('userAuthenticationToken');
  }

  isUserAuthenticated(): boolean {
    return (this.userData != null);
  }

  userHasExpectedRole(expectedRole: string): boolean {
    let hasExpectedRole = false;

    if (this.userData != null) {
      this.userData.roles.forEach(role => {
        if (role.authority === expectedRole) {
          hasExpectedRole = true;
        }
      });
    }

    return hasExpectedRole;
  }
}
