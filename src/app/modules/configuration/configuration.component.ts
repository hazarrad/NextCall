import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FaqService } from '../faq/faq.service';
import { qna } from '../faq/qna.model';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {


  @ViewChild('closebuttonqna',{static:true}) closebuttonqna;
  constructor(private faqService: FaqService) { }

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  faqList: qna[] = []

  showBtnUpdateQnA:boolean=false;


  public selectedQnA =new qna(0,'','','','')
  formfaq = new FormGroup({

    title: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
    linkAnswer: new FormControl('', Validators.required),

    

  })

 getQnAById(item){
   this.selectedQnA=item;
   this.showBtnUpdateQnA=true;
  this.faqService.getbyid(item).subscribe(data =>{
    this.formfaq.get("title").setValue(data.title);
    this.formfaq.get("answer").setValue(data.answer);
    this.formfaq.get("linkAnswer").setValue(data.linkAnswer);

  })
 }

 deleteQnA(faq:qna){
  this.faqService.deleteqna(faq)
    Swal.fire({
      text: "Your item has been removed successfully!",
      icon: 'success'
    })
    this.rerender();
  
 

 }

 updateQnA(qnaEdit:qna){
  
  qnaEdit.id=this.selectedQnA.id;
  console.log(qnaEdit)
  this.faqService.updateQnA(qnaEdit).subscribe(data =>{
    this.closebuttonqna.nativeElement.click();

    // console.log(data);
    Swal.fire({
      text: "Good job!",
      icon: 'success'
    })

    this.formfaq.reset()
    this.showBtnUpdateQnA=true;

    this.rerender();

  })
 }

 rerender(): void {
  // Destroy the table first
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    // this.dtTrigger.next();
  }).then(() => {
    this.faqService.findAllfaq().subscribe((data) => {
      this.faqList = data;
      this.dtTrigger.next();
    }, (err) => {
      console.log('-----> err', err);
    })
  })

}


  submit(form) {


    this.faqService.createQnA(form).subscribe(data => {
      this.closebuttonqna.nativeElement.click();
      Swal.fire({
        text: "Good job!",
        icon: 'success'
      })
      this.formfaq.reset()

    })
  }
  ngOnInit() {


    this.faqService.findAllfaq().subscribe(data => {
      this.faqList = data;
      this.dtTrigger.next();

    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      lengthMenu: [[4, 10, 25, 50, -1], [4, 10, 25, 50, "All"]]
    };
  }

}
