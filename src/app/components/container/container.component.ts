import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessManagementService } from 'src/app/modules/access-management/services/access-management.service';
import { LoginService } from 'src/app/modules/login/login.service';
import { Roles, Users } from 'src/app/modules/sessions/services/model/Users';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  expression=true;

  @Input() user:Users;

  userRoleStatus:Roles;
  constructor(private loginService:LoginService,private accessServices:AccessManagementService, private router:Router) { }
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  ngOnInit() {

  
    this.user=JSON.parse(sessionStorage.getItem('connectedUser'))
    this.getImagebyid(this.user.id);
   
    // this.base64Data =  this.user.picture;
    // this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    // console.log(this.base64Data)
    // console.log(this.retrievedImage)
     this.userRoleStatus=JSON.parse(sessionStorage.getItem('connectedUser')).role;

  }

  usersres: Users;
  userres: Users = new Users('', null, null, true,'','',null, new Date, '', new Date, '', '');

  getImagebyid(id) {
    this.userres.id=id;
    this.accessServices.getbyid(this.userres).subscribe((res) => {
          this.usersres=res;
          this.retrieveResonse = res.picture;
          this.base64Data = res.picture;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
  
  logout(){
    this.loginService.logout();
    this.router.navigate(['login'])
  }

  
}
