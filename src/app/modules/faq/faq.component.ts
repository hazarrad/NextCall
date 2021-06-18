import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FaqService } from './faq.service';
import { qna } from './qna.model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private faqService:FaqService) { }

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  faqList:qna[]=[]

  ngOnInit() {


    
    this.faqService.findAllfaq().subscribe(data =>{
      this.faqList=data;
      this.dtTrigger.next();

    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      lengthMenu: [[4, 10, 25, 50, -1], [4, 10, 25, 50, "All"]]
    };
  }

}
