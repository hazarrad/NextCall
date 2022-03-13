import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sessions, Status } from './model/sessionModel';
import { Roles, Users } from './model/Users';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  constructor(private httpClient: HttpClient) { }

  public createSession(session: Sessions) {
    return this.httpClient.post<Sessions>("http://localhost:8080/addSession", session);
  }


  public editSessionbyid(session: Sessions) {
    return this.httpClient.post<Sessions>("http://localhost:8080/editSessionbyid", session);
  }


  // public addconfig(conf: configuration) {
  //   return this.httpClient.post<configuration>("http://localhost:8080/addconfig", conf);
  // }
  public findAll(): Observable<Sessions[]> {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user' + ':' + 'c06a32fd-eb55-4a33-b723-4518e788c705') });
    return this.httpClient.get<Sessions[]>("http://localhost:8080/findAllSessions");
  }

  public getAllByMonth(status: Status,month: number): Observable<number> {
    return this.httpClient.get<number>("http://localhost:8080/getAllByMonth?status="+status+"&month=" + month);
  }

  public findAllBystatus(status: Status): Observable<Sessions[]> {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user' + ':' + 'c06a32fd-eb55-4a33-b723-4518e788c705') });
    return this.httpClient.get<Sessions[]>("http://localhost:8080/findAllBystatus?status=" + status);
  }


  public findAllByRole(role: Roles): Observable<Users[]> {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user' + ':' + 'c06a32fd-eb55-4a33-b723-4518e788c705') });
    return this.httpClient.get<Users[]>("http://localhost:8080/findAllByRole?role=" + role);
  }


  public getuserById(id: number) :Observable<Users> {
    return this.httpClient.get<Users>("http://localhost:8080/getByID?id=" + id, { responseType: 'text' as 'json' });
  }


  public getSessionById(id: number): Observable<Sessions> {
    return this.httpClient.get<Sessions>("http://localhost:8080/getSessionById?id=" + id, { responseType: 'text' as 'json' });
  }
  public deleteSessionById(id: number): Observable<string> {
    return this.httpClient.get<string>("http://localhost:8080/deleteSessionById?id=" + id, { responseType: 'text' as 'json' });
  }

  // public deleteStaff(staff: Staff) {
  //   console.log(staff);
  //   return this.httpClient.get<Staff>("http://localhost:8080/deleteStaffById?id=" + staff.id, { responseType: 'text' as 'json' });
  // }

  // public findAllByRole(role:Role): Observable<Staff[]> {
  //   //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user' + ':' + 'c06a32fd-eb55-4a33-b723-4518e788c705') });
  //   return this.httpClient.get<Staff[]>("http://localhost:8080/findAllByRole?role="+role);
  // }

  // public getStaffByIdNumber(id: number) {
  //   // console.log(staff);
  //   return this.httpClient.get<Staff>("http://localhost:8080/getStaff?id=" + id, { responseType: 'text' as 'json' });
  // }

  // public editStaff(staff: Staff) {
  //   return this.httpClient.post<Staff>("http://localhost:8080/editStaffbyid", staff, { responseType: 'text' as 'json' });
  // }
  // public getStaffById(staff: Staff) {
  //   // console.log(staff);
  //   return this.httpClient.get<Staff>("http://localhost:8080/getStaff?id=" + staff.id);
  // }

}
