import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AccessManagementService } from '../../access-management/services/access-management.service';
import { Users } from '../../sessions/services/model/Users';
import { LoginService } from '../login.service';
import { retry, catchError } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent implements OnInit {
  userres: Users = new Users('', null, null, true, '', '', null, new Date, '', new Date, '', '');

  loginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)

  })

  private email: string;
  private password: string;
  isloggedIn: boolean = false;
  redirectURL: string;

  constructor(private loginService: LoginService, private accessServices: AccessManagementService, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('isloggedIn')) {
      this.router.navigate([JSON.parse(sessionStorage.getItem('connectedUser')).role])
    }
  }

  handleError(error) {

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // alert(errorMessage);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage
    })
    // this.SweetErrors(errorMessage);
    return throwError(errorMessage);
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {

    this.email = this.loginForm.get('email').value;
    this.password = this.loginForm.get('password').value;

    console.log(this.email + "  " + this.password)

    this.loginService.login(this.email, this.password)
      .subscribe(userData => {
        sessionStorage.clear();
        if (userData != null && userData.password == this.password) {
          if (userData.isActive === true) {
            this.redirectURL = `${userData.role}`;
            this.isloggedIn = true;
            sessionStorage.setItem('isloggedIn', JSON.stringify(this.isloggedIn));
            sessionStorage.setItem('connectedUser', JSON.stringify(userData));
            this.router.navigate([this.redirectURL])
            userData.lastLoginDate = new Date();
            this.accessServices.updateUser(userData);
          } else {
            this.whenAccessIsDenied()
          }
        } else {
          this.whenLoginIsWrong();
          this.isloggedIn = false;
        }
      })
  }

  whenLoginIsWrong() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  }

  SweetErrors(message) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    })
  }

  whenAccessIsDenied() {
    Swal.fire({
      icon: 'error',
      title: 'Access',
      text: "Sorry you don't have access to this apllication!",
    })
  }
}
