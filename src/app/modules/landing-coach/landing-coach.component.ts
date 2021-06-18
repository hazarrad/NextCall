import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Chart } from 'node_modules/chart.js'
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Sessions, Status } from '../sessions/services/model/sessionModel';
import { SessionServiceService } from '../sessions/services/session-service.service';

@Component({
  selector: 'app-landing-coach',
  templateUrl: './landing-coach.component.html',
  styleUrls: ['./landing-coach.component.css']
})
@Injectable()
export class LandingCoachComponent implements OnInit {

  session: Sessions = new Sessions(0, '', '', '', '', '', '', new Date, new Date, Status.SSN_New, true, true, '', '', '', '', '', '', '', '', '', '', '')


  SessionsNew: Sessions[] = [];
  Sessions2Plan: Sessions[] = [];
  dtOptions: DataTables.Settings = {};

  
  constructor(private sessionService: SessionServiceService) { }
  postsCoach;
  ngOnInit() {
    this.chartCoach();
    this.sessionService.findAllBystatus(Status.SSN_New).subscribe(data => {
      this.SessionsNew = data;
    });
    this.sessionService.findAllBystatus(Status.SSN_2Plan).subscribe(data => {
      this.Sessions2Plan = data;
    })
  }

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
        this.postsCoach = data;
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

  AccettaProposta() {
    // var data = {
    //   ID: rowID,
    //   Status: 'SSN_2Plan',
    // };

    // $SP().list("Sessions").update(data)
    //   .then(function () {
    Swal.fire({
      icon: 'success',
      title: 'You have accepted the coaching offer!',
      text: 'Thank you for accepting the coaching proposal. Soon the Coachee will enter the details for accessing the session in Veeva Engage and you will be notified by e-mail with all the details.',
    })
    //   bodyNewCall.row('.selected').remove().draw(false);

    //   $SP().list("Sessions").get({
    //     fields: "ID,CoacheeID_x003a_Name,CoachID_x003a_Name, RejectionReason,CancellationReason,CoacheeID,ScheduledStart, Status",
    //     where: "ID = '" + rowID + "'"
    //   }).then(function (result) {
    //     var objData = [
    //       Number(result[0].getAttribute("ID")),
    //       $SP().cleanResult(result[0].getAttribute("CoacheeID_x003a_Name")),
    //       result[0].getAttribute("ScheduledStart"),
    //       changeStatusByI18nCoach(result[0].getAttribute("Status")),
    //       showActionsByStatus(result[0].getAttribute("Status"), Number(result[0].getAttribute("ID"))),
    //     ]
    //     body2PlanCall.row.add(objData).draw();
    //   })
    // })
  }

  RifiutaProposta() {
    Swal.fire({
      icon: 'error',
      input: 'textarea',
      title: 'Reject the call proposal',
      showCancelButton: true,
      confirmButtonText: 'Send',
      confirmButtonColor: "#24252A",
      cancelButtonText: 'Cancel',
      text: 'Please enter a reason before sending the rejection to the Coachee.',
      // preConfirm: (result) => {
      //     if (result) {
      //         var today = new Date();
      //         var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      //         var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      //         const dateTime = date + ' ' + time;

      //         const answers = result
      //         console.log('result' + JSON.stringify(result.value));

      //         var data = {
      //             ID: rowID,
      //             Status: 'SSN_Rejected',
      //             RejectedDate: dateTime,
      //             RejectionReason: answers
      //         };

      //         $SP().list("Sessions").update(data)
      //             .then(function () {
      //                 Swal.fire({
      //                     icon: 'success',
      //                     title: i18n[lang].Coach_Home.Done_Sweet_TitleDone,
      //                     confirmButtonText: i18n[lang].Coach_Home.Done_Sweet_ok,
      //                 })

      //                 bodyNewCall.row('.selected').remove().draw(false);

      //                 $SP().list("Sessions").get({
      //                     fields: "ID,CoacheeID_x003a_Name,CoachID_x003a_Name, RejectionReason,CancellationReason,CoacheeID,ScheduledStart, Status",
      //                     where: "ID = '" + rowID + "'"
      //                 }).then(function (result) {
      //                     var objData = [
      //                         Number(result[0].getAttribute("ID")),
      //                         $SP().cleanResult(result[0].getAttribute("CoacheeID_x003a_Name")),
      //                         result[0].getAttribute("ScheduledStart"),
      //                         changeStatusByI18nCoach(result[0].getAttribute("Status")),
      //                         showActionsByStatus(result[0].getAttribute("Status"), Number(result[0].getAttribute("ID"))),
      //                     ]
      //                     bodyCompletedCall.row.add(objData).draw();
      //                 })
      //             })
      //     } else {
      //         Swal.showValidationMessage(i18n[lang].Coachee_Home.provideURL_Sweet_ValidtaionMessage)
      //     }
      // }
    })
  }

  CancellCallPlanifica() {
    Swal.fire({
      icon: 'error',
      input: 'textarea',
      title: 'Cancel scheduled session',
      showCancelButton: true,
      confirmButtonText: 'Send',
      confirmButtonColor: "#24252A",
      cancelButtonText: 'Cancel',
      text: 'You have chosen to cancel an already scheduled session. Before proceeding please enter a reason.',
      // preConfirm: (result) => {
      //     if (result) {

      //         var today = new Date();
      //         var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      //         var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      //         const dateTime = date + ' ' + time;

      //         const answers = result
      //         console.log('result' + JSON.stringify(result));

      //         var data = {
      //             ID: rowID,
      //             Status: 'SSN_Cancelled',
      //             CancelledDate: dateTime,
      //             CancellationReason: answers,
      //             CancelledBy: currentuserId,
      //             CancelledBy_x003a_Name: currentUserName,
      //             CancelledBy_x003a_Email: currentEmail
      //         };

      //         $SP().list("Sessions").update(data)
      //             .then(function () {
      //                 Swal.fire({
      //                     icon: 'success',
      //                     title: i18n[lang].Coach_Home.Done_Sweet_TitleDone,
      //                     confirmButtonText: i18n[lang].Coach_Home.Done_Sweet_ok,
      //                 })
      //                 if (status == 'SSN_2Plan') {
      //                     body2PlanCall.row('.selected').remove().draw(false);
      //                 }
      //                 if (status == 'SSN_Planned') {
      //                     bodyPlannedCall.row('.selected').remove().draw(false);
      //                 }
      //                 if (status == 'SSN_FeedbackReq') {
      //                     bodyCallFeedbacks.row('.selected').remove().draw(false);
      //                 }
      //                 $SP().list("Sessions").get({
      //                     fields: "ID,CoacheeID_x003a_Name,CoachID_x003a_Name, RejectionReason,CancellationReason,CoacheeID,ScheduledStart, Status",
      //                     where: "ID = '" + rowID + "'"
      //                 }).then(function (result) {
      //                     var objData = [
      //                         Number(result[0].getAttribute("ID")),
      //                         $SP().cleanResult(result[0].getAttribute("CoacheeID_x003a_Name")),
      //                         result[0].getAttribute("ScheduledStart"),
      //                         changeStatusByI18nCoach(result[0].getAttribute("Status")),
      //                         showActionsByStatus(result[0].getAttribute("Status"), Number(result[0].getAttribute("ID"))),
      //                     ]
      //                     bodyCompletedCall.row.add(objData).draw();
      //                 })
      //             })
      //     } else {
      //         Swal.showValidationMessage(i18n[lang].Coachee_Home.provideURL_Sweet_ValidtaionMessage)
      //     }
      // }
    })
  }


  async largeFileAlert(file) {
    try {
      const alert = await Swal.fire({
        title: 'Are you sure?',
        text: `Warning, your image file is too heavy for this specific format.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Keep it!',
        cancelButtonText: 'No, Cancel it'
      });
      return !!(alert.value && alert.value === true);
    } catch (e) {
      console.log('error:', e);
      return false;
    }
  }

  //  createButton(text, cb) {
  //   return $('<button class="btn btn-primary">' + text + '</button>').on('click', cb);
  // }

  async evaluate() {
    var inputOptionsPromise = ['Adequate', 'Development area']
    // var buttons = $('<div>')
    // .append('<button class="btn btn-primary"> Save </button>')
    // .append('<button class="btn btn-primary"> Send </button>')
    // .append('<button class="btn btn-primary"> Cancel </button>');

     await Swal.mixin({
      title: 'Feedback on customer engagement',
      // input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      animation: true,
      width: 600,
      progressSteps: ['1', '2', '3', '4', '5', '6', '7']
    }).queue([
      {
        title: 'Engagement preparation',
        input: 'select',
        inputOptions: inputOptionsPromise
      },
      {
        title: 'Involve the interlocutor',
        input: 'select',
        inputOptions: inputOptionsPromise
      },
      {
        title: 'Individuare i bisogni',
        input: 'select',
        inputOptions: inputOptionsPromise
      },
      {
        title: 'Provide solutions',
        input: 'select',
        inputOptions: inputOptionsPromise
      },
      {
        title: 'Verify and manage the perceived',
        input: 'select',
        inputOptions: inputOptionsPromise
      },
      {
        title: 'Get the deal',
        input: 'select',
        inputOptions: inputOptionsPromise
      },
      {
        title: 'Post call feedback: behavior implemented',
        text: 'Enter specific comments here regarding the behavior related to individual activities',
        input: 'textarea'
      }

    ]).then((result) => {
      if (result) {
        Swal.fire({
          icon: 'info',
          title: 'Send it',
          // html:buttons,
          text: 'Something went wrong!',
          showDenyButton: true,
          showCancelButton: true,
          denyButtonColor: '#24252A',
          denyButtonText: ` save`,
          confirmButtonText: `Send`,


        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })

      }
      // if (accept) {
      //   Swal.fire('You agreed with T&C :)')
      // }
      // if (result.value) {
      //   const answers = JSON.stringify(result.value)
      //   Swal.fire({
      //     title: 'All done!',
      //     html: `
      //       Your answers:
      //       <pre><code>${answers}</code></pre>
      //     `,
      //     confirmButtonText: 'Lovely!'
      //   })
      // }
    })
  }

  showCoacheeComment() {

    var commentCoachee = "hello world";
    // $SP().list("Sessions").get({
    //     fields: "ID,CoachID_x003a_Name,CoacheeID_x003a_Name,Status,Created,ScheduledStart,ScheduledEnd,ScenarioAreaTerapeutica,ScenarioKeyMessage,ScenarioCompetitor,ScenarioContext1,ScenarioContext2,ScenarioTerritorio,ScenarioPrimaVisita,ScenarioKOL,ScenarioDigitalProfile,ScenarioCompetitorShare,ScenarioCMVProfile,ScenarioAdoption,ScenarioObiettivi,ScenarioAgenda,CoacheeComment",
    //     where: "ID = '" + rowID + "'"
    // }).then(function (data) {
    //     for (var i = 0; i < data.length; i++) {
    //         commentCoachee = data[i].getAttribute("CoacheeComment")
    //     }
    // }).then(function () {
    Swal.fire({
      icon: 'info',
      title: "Coachee Comment ",
      imageAlt: 'Custom image',
      showCancelButton: true,
      showConfirmButton: false,
      // cancelButtonText: i18n[lang].Coach_Home.ShowCoachee_Sweet_back,
      html: ` <strong>${commentCoachee}</strong> `
    })
    // })
  }


  showReasons() {
    Swal.fire({
      title: '<strong>Reason for refusal or cancellation</strong>',
      icon: 'info',
      html:
        '<h3>Reason for refusal : </h3> <br>' +
        'some reason <br> <hr>' +
        '<h3>Reason for cancellation  :</h3> <br>' +
        'some reason <br>',
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false
    })
  }

  chartCoach() {
    var ctx = document.getElementById('myChart2');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
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
