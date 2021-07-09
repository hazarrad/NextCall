import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Chart } from 'node_modules/chart.js'
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Sessions, Status } from '../sessions/services/model/sessionModel';
import { Roles, Users } from '../sessions/services/model/Users';
import { SessionServiceService } from '../sessions/services/session-service.service';
@Component({
  selector: 'app-landing-coachee',
  templateUrl: './landing-coachee.component.html',
  styleUrls: ['./landing-coachee.component.css'],
  providers: [DatePipe]
})
export class LandingCoacheeComponent implements OnInit {

  profileForm: FormGroup;
  form: FormGroup;
  session: Sessions = new Sessions(0, '', '', '', '', '', '','', new Date, Status.SSN_New, true, true, '', '', '', '', '', '', '', '', '', '', '')
  keys = Object.keys;
  status = Status;
  constructor(private datePipe: DatePipe, private http: HttpClient, private sessionService: SessionServiceService, private formBuilder: FormBuilder) { }
  dtOptions: DataTables.Settings = {};
  postsCoachee;

  role: Roles;

  coachsList: Users[] = [];
  sessionsList: Sessions[] = [];

  showDataEvaluationform() {


    console.log("click to showDataEvaluationform")
  }

  showReasonsRejectiondandCancellation() {
    console.log("click to showReasonsRejectiondandCancellation")

  }
  keysCoach = Object.keys;
  ngOnInit() {
    this.chartCoachee();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
    };

    this.sessionService.findAllByRole(Roles.Coach).subscribe(data => {
      this.coachsList = data;
      console.log(this.coachsList)
    })



    this.form = new FormGroup({
      
      coachSelected: new FormControl('', Validators.required),
      status: new FormControl(Status.SSN_Draft, Validators.required),
      scheduledStart: new FormControl(new Date(), Validators.required),
      scheduledEnd: new FormControl('', Validators.required),
      slotStart: new FormControl('', Validators.required),
      slotEnd: new FormControl('', Validators.required),
      scenarioAreaTerapeutica: new FormControl('', Validators.required),
      scenarioKeyMessage: new FormControl('', Validators.required),
      scenarioCompetitor: new FormControl('', Validators.required),
      scenarioContext1: new FormControl('', Validators.required),
      scenarioContext2: new FormControl('', Validators.required),
      scenarioTerritorio: new FormControl('', Validators.required),
      scenarioDigitalProfile: new FormControl('', Validators.required),
      scenarioCMVProfile: new FormControl('', Validators.required),
      scenarioAdoption: new FormControl('', Validators.required),
      scenarioObiettivi: new FormControl('', Validators.required),
      scenarioAgenda: new FormControl('', Validators.required),
    });

    // this.form.get('scheduledStart').valueChanges.subscribe(value => {
    //   this.form.get('scheduledEnd').setValue(value)
    // })


    
    this.form.get("coachSelected").valueChanges.subscribe(selectedValue => {
      console.log(selectedValue)
    })

    

    this.form.get("scheduledStart").valueChanges.subscribe(selectedValue => {
      console.log('firstname value changed')
      console.log(selectedValue)
      console.log(this.form.get("scheduledStart").value)
      console.log(this.form.value)    //shows the old first name

      setTimeout(() => {
        console.log(this.form.value)   //shows the latest first name
      })

    })

    this.profileForm = this.formBuilder.group({
      'key': ['', Validators.compose([Validators.required])],
      'value': ['', Validators.compose([Validators.required])],
    });

    //   this.http.get('http://jsonplaceholder.typicode.com/posts')
    //   .subscribe(data => {
    //     this.postsCoachee = data;
    // });
    this.sessionService.findAll().subscribe(data => {
      this.sessionsList = data;
    })

    // $('#scheduledStart').change(function () {
    //   var date = $(this).val();
    //   $('#scheduledEnd').val(date);
    //   console.log($('#scheduledEnd').val(), 'change')
    // });
  }

  // addconf(confi:configuration) {
  //   // TODO: Use EventEmitter with form value
  //   this.conf=confi;
  //   console.warn(this.conf);


  //   this.sessionService.addconfig(this.conf).subscribe(data => {
  //     console.log(data)
  //   });
  // }
  
  @ViewChild('closebutton', { static: true }) closebutton;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  rerender(): void {
    // Destroy the table first
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      // this.dtTrigger.next();
    }).then(() => {
      this.sessionService.findAll().subscribe((data) => {
        this.postsCoachee = data;
        this.dtTrigger.next();
      }, (err) => {
        console.log('-----> err', err);
      })
    })
    // this.users = [];
    // this.accessServices.findAll().subscribe((data) => {
    // this.users = data;

    // }, (err) => {
    //   console.log('-----> err', err);
    // })
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  submit() {

    console.log("hello world")
    this.session = this.form.value;

    this.session.ScheduledStart=this.datePipe.transform(new Date(), 'yyyy-MM-dd');


    this.sessionService.createSession(this.session).subscribe(data => {
      console.log(data)
      this.closebutton.nativeElement.click();
      Swal.fire({
        title: 'Good job',
        text: "Your session has been created succesfully",
        icon: 'success',
      })
    });
  }

  removeCall() {
    // var data = {
    //   ID: rowID,
    // };
    Swal.fire({
      title: "Are you sure?",
      text: "If you delete this session you will no longer be able to recover it and you will have to create a new one!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes",
    }).then((result) => {
      // if (result.isConfirmed) {
      // $SP().list("Sessions").remove(data)
      //   .then(function () {
      //     bodySessionsCoachee.row('.selected').remove().draw(false);
      //     Swal.fire({
      //       icon: 'success',
      //       title: i18n[lang].Coachee_Home.removeDraft_Sweet_TitleDone,
      //       confirmButtonText: i18n[lang].Coachee_Home.removeDraft_Sweet_ok,
      //     })
      //   })
      // }
    })
  }

  CancellCallPlanifica() {
    Swal.fire({
      icon: 'error',
      input: 'textarea',
      title: "Cancel scheduled session",
      showCancelButton: true,
      confirmButtonText: "Cancel session",
      cancelButtonText: "No",
      confirmButtonColor: "#24252A",
      text: "You have chosen to cancel an already scheduled session. Before proceeding please enter a reason.",
      preConfirm: (result) => {
        // if (result) {
        //   var today = new Date();
        //   var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        //   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        //   const dateTime = date + ' ' + time;
        //   const answers = result

        //   var data = {
        //     ID: rowID,
        //     Status: 'SSN_Cancelled',
        //     CancelledDate: dateTime,
        //     CancellationReason: answers,
        //     CancelledBy: currentuserId,
        //     CancelledBy_x003a_Name: currentUserName,
        //     CancelledBy_x003a_Email: currentEmail
        //   };

        //   $SP().list("Sessions").update(data)
        //     .then(function () {
        //       Swal.fire({
        //         icon: 'success',
        //         title: i18n[lang].Coachee_Home.provideURL_Sweet_TitleDone,
        //         confirmButtonText: i18n[lang].Coachee_Home.provideURL_Sweet_ok,
        //       })
        //       $SP().list("Sessions").get({
        //         fields: "ID,CoachID_x003a_Name,CoacheeID_x003a_Name,Status,Created,ScheduledStart,ScheduledEnd,ScenarioAreaTerapeutica,ScenarioKeyMessage,ScenarioCompetitor,ScenarioContext1,ScenarioContext2,ScenarioTerritorio,ScenarioPrimaVisita,ScenarioKOL,ScenarioDigitalProfile,ScenarioCompetitorShare,ScenarioCMVProfile,ScenarioAdoption,ScenarioObiettivi,ScenarioAgenda,CoacheeComment",
        //         where: "ID = '" + rowID + "'"
        //       }).then(function (data) {
        //         var objData;
        //         for (var i = 0; i < data.length; i++) {
        //           objData = [
        //             data[i].getAttribute("ID"),
        //             $SP().cleanResult(data[i].getAttribute("CoachID_x003a_Name")),
        //             data[i].getAttribute("ScheduledStart"),
        //             changeStatusByI18n(data[i].getAttribute("Status")),
        //             showActionsByStatus(data[i].getAttribute("Status"), Number(data[i].getAttribute("ID"))),
        //           ]
        //         }
        //         bodySessionsCoachee.row('.selected').data(objData).draw();
        //       })
        //     })
        // } else {
        //   Swal.showValidationMessage(i18n[lang].Coachee_Home.provideURL_Sweet_ValidtaionMessage)
        // }
      }
    })
  }

  async provideURL() {
    var urlValue;
    var VeevaLink;
    // $SP().list("Sessions").get({
    //     fields: "ID,CoachID_x003a_Name,CoacheeID_x003a_Name,URL,Status,Created,ScheduledStart,ScheduledEnd,ScenarioAreaTerapeutica,ScenarioKeyMessage,ScenarioCompetitor,ScenarioContext1,ScenarioContext2,ScenarioTerritorio,ScenarioPrimaVisita,ScenarioKOL,ScenarioDigitalProfile,ScenarioCMVProfile,ScenarioAdoption,ScenarioObiettivi,ScenarioAgenda,CoacheeComment",
    //     where: "ID = '" + rowID + "'",
    // }).then(async function (data) {
    //     for (var i = 0; i < data.length; i++) {
    //         urlValue = data[i].getAttribute("URL")
    //     }
    //     if (urlValue == null) {
    const { value: url } = await Swal.fire({
      icon: 'question',
      input: 'url',
      inputPlaceholder: "URL",
      title: "Provide URL",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#24252A",
      text: "Provide a correct link",
      // preConfirm: (result) => {
      //     /******Check if this value equal true */
      //     for (let i = 0; i < arrConfig.length; i++) {
      //         var key = arrConfig[i].key;
      //         if (key == "VeevaLink") {
      //             /****the value extracted */
      //             VeevaLink = arrConfig[i].value;
      //         }
      //     }
      //     var checkInculde = result.includes(VeevaLink);
      //     if (checkInculde == true) {
      //         const answers = result
      //         var data = {
      //             ID: rowID,
      //             Status: 'SSN_Planned',
      //             URL: answers
      //         };
      //         $SP().list("Sessions").update(data);
      //         Swal.fire({
      //             icon: 'success',
      //             title: i18n[lang].Coachee_Home.provideURL_Sweet_TitleDone,
      //             confirmButtonText: i18n[lang].Coachee_Home.provideURL_Sweet_ok,
      //         })
      //     } else {
      //         Swal.showValidationMessage(i18n[lang].Coachee_Home.provideURL_Sweet_VeevaLink)
      //     }
      // }
    })

    // else {
    //     Swal.fire({
    //         icon: 'question',
    //         inputPlaceholder: i18n[lang].Coachee_Home.provideURL_Sweet_Placeholder,
    //         title: i18n[lang].Coachee_Home.provideURL_Sweet_Title,
    //         showCancelButton: true,
    //         showConfirmButton: false,
    //         confirmButtonText: i18n[lang].Coachee_Home.provideURL_Sweet_invia,
    //         cancelButtonText: i18n[lang].Coachee_Home.provideURL_Sweet_back,
    //         confirmButtonColor: "#24252A",
    //         text: i18n[lang].Coachee_Home.provideURL_Sweet_text,
    //         html: ` <strong>${urlValue}</strong> `,
    //     })
    // }
    // })
  }

  commentToCoachee() {
    var coaheeComment;
    // $SP().list("Sessions").get({
    //     fields: "ID,CoachID_x003a_Name,CoacheeID_x003a_Name,Status,Created,ScheduledStart,ScheduledEnd,ScenarioAreaTerapeutica,ScenarioKeyMessage,ScenarioCompetitor,ScenarioContext1,ScenarioContext2,ScenarioTerritorio,ScenarioPrimaVisita,ScenarioKOL,ScenarioDigitalProfile,ScenarioCMVProfile,ScenarioAdoption,ScenarioObiettivi,ScenarioAgenda,CoacheeComment,commentIsSent",
    //     where: "ID = '" + rowID + "'",
    // }).then(function (data) {
    //     for (var i = 0; i < data.length; i++) {
    //         coaheeComment = data[i].getAttribute("CoacheeComment")
    //     }
    //     if (coaheeComment == null) {
    Swal.fire({
      icon: 'info',
      title: "Provide Comment",
      text: "Write down your comment",
      imageAlt: 'Custom image',
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "confirm",
      input: 'textarea',
      confirmButtonColor: "#24252A",
      // preConfirm: (result) => {
      //     if (result) {
      //         const answers = result
      //         var data = {
      //             ID: rowID,
      //             CoacheeComment: answers,
      //         };
      //         $SP().list("Sessions").update(data)
      //             .then(function () {
      //                 Swal.fire({
      //                     icon: 'success',
      //                     title: i18n[lang].Coachee_Home.provideURL_Sweet_TitleDone,
      //                     confirmButtonText: i18n[lang].Coachee_Home.provideURL_Sweet_ok,
      //                 })
      //             })
      //     } else {
      //         Swal.showValidationMessage(i18n[lang].Coachee_Home.provideURL_Sweet_ValidtaionMessage)
      //     }
      // }
    })

    // else {
    //     Swal.fire({
    //         icon: 'info',
    //         title: i18n[lang].Coachee_Home.Popup_Visualizecomment_title,
    //         text: i18n[lang].Coachee_Home.Popup_Visualizecomment_subtitle,
    //         imageAlt: 'Custom image',
    //         showCancelButton: true,
    //         showConfirmButton: false,
    //         cancelButtonText: i18n[lang].Coachee_Home.Popup_Visualizecomment_back,
    //         confirmButtonText: i18n[lang].Coachee_Home.Popup_Visualizecomment_invia,
    //         html: ` <strong>${coaheeComment}</strong> `,
    //     })
    // }
    // })
  }


  chartCoachee() {
    var ctx = document.getElementById('myChart2');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Sessions',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
