import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Sessions, Status } from './model/sessionModel';
import { Roles, Users } from './model/Users';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  constructor(private httpClient: HttpClient) { }

  public createSession(session: Sessions) {
    return this.httpClient.post<Sessions>("https://mcprettycall.herokuapp.com/addSession", session);
  }

  // public addconfig(conf: configuration) {
  //   return this.httpClient.post<configuration>("https://mcprettycall.herokuapp.com/addconfig", conf);
  // }
  public findAll(): Observable<Sessions[]> {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user' + ':' + 'c06a32fd-eb55-4a33-b723-4518e788c705') });
    return this.httpClient.get<Sessions[]>("https://mcprettycall.herokuapp.com/findAllSessions");
  }
  public findAllBystatus(status:Status): Observable<Sessions[]> {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user' + ':' + 'c06a32fd-eb55-4a33-b723-4518e788c705') });
    return this.httpClient.get<Sessions[]>("https://mcprettycall.herokuapp.com/findAllBystatus?status="+status);
  }
  

  public findAllByRole(role:Roles): Observable<Users[]> {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user' + ':' + 'c06a32fd-eb55-4a33-b723-4518e788c705') });
    return this.httpClient.get<Users[]>("https://mcprettycall.herokuapp.com/findAllByRole?role="+role);
  }

  
  // public deleteStaff(staff: Staff) {
  //   console.log(staff);
  //   return this.httpClient.get<Staff>("https://mcprettycall.herokuapp.com/deleteStaffById?id=" + staff.id, { responseType: 'text' as 'json' });
  // }

  // public findAllByRole(role:Role): Observable<Staff[]> {
  //   //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user' + ':' + 'c06a32fd-eb55-4a33-b723-4518e788c705') });
  //   return this.httpClient.get<Staff[]>("https://mcprettycall.herokuapp.com/findAllByRole?role="+role);
  // }
  
  // public getStaffByIdNumber(id: number) {
  //   // console.log(staff);
  //   return this.httpClient.get<Staff>("https://mcprettycall.herokuapp.com/getStaff?id=" + id, { responseType: 'text' as 'json' });
  // }

  // public editStaff(staff: Staff) {
  //   return this.httpClient.post<Staff>("https://mcprettycall.herokuapp.com/editStaffbyid", staff, { responseType: 'text' as 'json' });
  // }
  // public getStaffById(staff: Staff) {
  //   // console.log(staff);
  //   return this.httpClient.get<Staff>("https://mcprettycall.herokuapp.com/getStaff?id=" + staff.id);
  // }

}
