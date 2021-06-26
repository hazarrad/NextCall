import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../../sessions/services/model/Users';

@Injectable({
  providedIn: 'root'
})
export class AccessManagementService {

  constructor(private httpClient: HttpClient) { }


  public findAll(): Observable<Users[]> {
    return this.httpClient.get<Users[]>("http://localhost:8080/findAllUsers");
  }

  // public createUser(user: Users) {
  //   return this.httpClient.post<Users>("http://localhost:8080/createUsers", user);
  // }

  public createUser(formdata: FormData): Observable<any> {
    return this.httpClient.post("http://localhost:8080/upload", formdata);
  }

  public updateUser(user: Users): Observable<any> {
    return this.httpClient.post<Users>("http://localhost:8080/updateUserFormData", user);
  }
  

  public deleteUser(user: Users) {
    return this.httpClient.get<Users>("http://localhost:8080/deleteUserByID?id=" + user.id, { responseType: 'text' as 'json' });
  }

  public getbyid(user: Users) {
    return this.httpClient.get<Users>("http://localhost:8080/getByIDImage?id=" + user.id);
  }
 

  // public createUser2(user: Users,selectedFile: File) {
  //   const uploadImageData = new FormData();
  //   uploadImageData.append('imageFile', selectedFile, selectedFile.name);
  //   return this.httpClient.post<Users>('http://localhost:8080/upload',user+'&?'+uploadImageData, { observe: 'response' });
  // }

  // onUpload() {
  //   console.log(this.selectedFile);

  


}
