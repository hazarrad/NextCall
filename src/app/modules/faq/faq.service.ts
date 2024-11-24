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
    return this.httpclient.get<qna[]>('https://mcprettycall-service.onrender.com/findAllQnA');
  }

  public createQnA(faq:qna){
    return this.httpclient.post<qna>('https://mcprettycall-service.onrender.com/addQnA',faq);
  }

 
  public updateQnA(faq: qna): Observable<any> {
    return this.httpclient.post<qna>("https://mcprettycall-service.onrender.com/updateQnA", faq);
  }
  

  public deleteqna(faq: qna) {
    return this.httpclient.get<qna>("https://mcprettycall-service.onrender.com/deleteQnAById?id=" + faq.id);
  }

  

  public getbyid(faq: qna) {
    return this.httpclient.get<qna>("https://mcprettycall-service.onrender.com/getQnAByID?id=" + faq.id);
  }
}
