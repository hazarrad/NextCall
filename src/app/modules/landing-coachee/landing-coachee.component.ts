import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Chart } from 'node_modules/chart.js';
import { Session } from 'protractor';
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

  constructor(private elementRef: ElementRef, private sessionService: SessionServiceService, private formBuilder: FormBuilder) { }

  //DataTables
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();

  // Lists data
  coachsList: Users[] = [];
  myFood: any;
  sessionsList: Sessions[] = [];
  sessionsOfLastMonth: number = 0;
  sessionsOfLast3Months: number = 0;

  // Forms  
  createSessionForm: FormGroup = new FormGroup({
    coach: new FormControl('', Validators.required),
    coachee: new FormControl(JSON.parse(sessionStorage.getItem('connectedUser')), Validators.required),
    status: new FormControl('', Validators.required),
    scheduledStart: new FormControl('', Validators.required),
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



  //Models
  session: Sessions;
  status: Status;
  selectedCoach: number;
  // childs
  @ViewChild('closebutton', { static: true }) closebutton;

  ngOnInit() {
    this.sessionService.findAll().subscribe(data => { this.sessionsList = data; this.dtTrigger.next() })
    this.sessionService.findAllByRole(Roles.Coach).subscribe(data => { this.coachsList = data; this.dtTrigger2.next() })
    this.callKPI();
    this.chartCoachee();
    this.initDataTablesConfig();

    this.createSessionForm.get("coach").valueChanges.subscribe(selectedValue => { this.selectedCoach = selectedValue; })



  }

  callKPI() {
    this.sessionService.getAllByMonth(Status.SSN_Draft, 1).subscribe(data => { this.sessionsOfLastMonth = data });
    this.sessionService.getAllByMonth(Status.SSN_Draft, 3).subscribe(data => { this.sessionsOfLast3Months = data });
  }

  initDataTablesConfig() {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
    // };
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      dom: "B<'d-flex justify-content-between align-items-center mt-2' lf>rt<'d-flex justify-content-between align-items-center' ip>",

      initComplete: function (settings, json) {
        $('.button').removeClass('dt-button');
      },

      buttons: [

        {
          extend: 'excel',
          text: 'XLS',
          className: 'table-button button btn btn-success',
          exportOptions: {
            columns: ':visible'
          }
        },
        {
          extend: 'csv',
          text: 'CSV',
          className: 'table-button button btn btn-primary',
          exportOptions: {
            columns: ':visible'
          }

        },
        {
          sExtends:    "text",
          fnClick: function () {
            alert('Mouse click');
            console.log("yeeeep")
          },
          text: 'test',
          className: ' table-button button btn btn-success float-right',
          exportOptions: {
            columns: ':visible'
          }
        },

      ]




    };
  }


  submit() {
    this.createSessionForm.patchValue({
      status: Status.SSN_Draft,
      scheduledStart: this.createSessionForm.get("scheduledStart").value + 'T' + this.createSessionForm.get("slotStart").value + ':00',
      scheduledEnd: this.createSessionForm.get("scheduledStart").value + 'T' + this.createSessionForm.get("slotEnd").value + ':00'
    });
    this.session = this.createSessionForm.value;
    console.log("final" + JSON.stringify(this.session))
    this.sessionService.createSession(this.session).subscribe(data => {
      console.log(data)
      this.rerender();
      this.closebutton.nativeElement.click();
      this.toast("Your session has been created succesfully");
    });
  }

  rerender(): void {
    // Destroy the table first
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    }).then(() => {
      this.sessionService.findAll().subscribe((data) => {
        this.sessionsList = data;
        this.dtTrigger.next();
      }, (err) => {
        console.log('-----> err', err);
      });
      this.callKPI();
    })
  }


  removeCall(id) {
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
      if (result.isConfirmed) {
        this.sessionService.deleteSessionById(id).subscribe(data => {
          this.toast(data);
          this.rerender();
        })
      }
    })
  }


  CancellCallPlanifica(session: Sessions) {
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
        if (result) {
          session.status = Status.SSN_Cancelled;
          session.cancellationReason = result;
          session.cancelledBy = JSON.parse(sessionStorage.getItem('connectedUser')).id;
          this.sessionService.editSessionbyid(session).subscribe(data => {
            this.toast('Cancelled in successfully');
          });
        }
      }
    })
  }

  toast(title) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: title
    })
  }


  RefusalAndCancellationReasons(session: Sessions) {
    var reason;
    var reasonOf;
    switch (session.status) {
      case Status.SSN_Cancelled:
        reasonOf = "Cancellation"
        reason = session.cancellationReason
        break;
      case Status.SSN_Rejected:
        reasonOf = "Refusal"
        reason = "some refusal reason"
        break;
      default:
        break;
    }
    Swal.fire({
      title: '<strong>Reason Of ' + reasonOf + '</strong>',
      icon: 'info',
      html: reason,
      showCloseButton: true,
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: '# New Sessions',
            data: [1, 15, 3, 18, 1, 9, 21, 5, 5, 6, 7, 14],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 1
          },
          {
            label: '# Completed Sessions',
            data: [7, 3, 19, 2, 10, 5, 33, 4, 25, 8, 32, 3],
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          x: {
            type: 'time',
            time: {
              unit: 'month'
            }
          }
        }
      }
    });
  }
}
