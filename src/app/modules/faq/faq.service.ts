import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { qna } from './qna.model';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private httpclient:HttpClient) { }


  public findAllfaq():Observable<qna[]>{
    return this.httpclient.get<qna[]>('http://localhost:8080/findAllQnA');
  }

  public createQnA(faq:qna){
    return this.httpclient.post<qna>('http://localhost:8080/addQnA',faq);
  }

 
  public updateQnA(faq: qna): Observable<any> {
    return this.httpclient.post<qna>("http://localhost:8080/updateQnA", faq);
  }
  

  public deleteqna(faq: qna) {
    return this.httpclient.get<qna>("http://localhost:8080/deleteQnAById?id=" + faq.id);
  }

  

  public getbyid(faq: qna) {
    return this.httpclient.get<qna>("http://localhost:8080/getQnAByID?id=" + faq.id);
  }
}
