import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Users } from '../sessions/services/model/Users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn = false;
  redirectUrl: string;

  constructor(private router: Router, private httpClient: HttpClient) { }

  login(email: string, password: string) {
    // const headers= new HttpHeaders({Authorization :'Basic'+btoa(mail+":"+password)});
    const params = new HttpParams().set('email', email).set('password', password);
    return this.httpClient.get<Users>("https://mcprettycall.herokuapp.com/findByEmailAndPassword", { params }).pipe(
      map(
        userData => {
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('password', password);
          return userData;
        }
      )

    );
  }

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
