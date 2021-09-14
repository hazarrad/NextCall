import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Roles, Users, Profile } from '../sessions/services/model/Users';
import { AccessManagementService } from './services/access-management.service';

@Component({
  selector: 'app-access-management',
  templateUrl: './access-management.component.html',
  styleUrls: ['./access-management.component.css']
})
export class AccessManagementComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};




  showUploadImg: boolean = true;
  role: Roles;
  user: Users = new Users('', null, null, true, '', '', '', new Date, '', new Date, '', '');
  
  showBtnAddUser: boolean = true;
  showBtnUpdateUser: boolean = false;
  warning: string = "warning"
  users: Users[] = [];

  keysRole = Object.keys;
  roleOption = Roles;
  public usersManagers: Array<Users> = [];
  keys = Object.keys;
  profile = Profile;
  arrManagers: Array<Users> = [];

  userFile;
  imgUrl: any;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  form: FormGroup;
  //Make a call to the Spring Boot Application to save the image
  constructor(private httpClient: HttpClient, private cd: ChangeDetectorRef, private accessServices: AccessManagementService) { }

  // keysmanager = Object.keys;
  // managers=this.arrManagers;

  ngOnInit(): void {

    this.optionsDatable();

    this.accessServices.findAll().subscribe((data) => {
      this.users = data;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].profile === this.profile.Manager) {
          // this.arrManagers.push(data[i].email)
          this.arrManagers.push(this.users[i]);
        }
      }
      console.log('manager ' + this.arrManagers)
      this.dtTrigger.next()
    }, (err) => {
      console.log('-----> err', err);
    })

    this.formGroupElements();
  }


  optionsDatable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
    };
  }

  // onFileChange(event) {
  //   const reader = new FileReader();

  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       this.form.patchValue({
  //         file: reader.result
  //       });

  //       // need to run CD since file load runs outside of zone
  //       this.cd.markForCheck();
  //     };
  //   }
  // }

  get f() {
    return this.form.controls;
  }

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  id: any;  //Gets called when the user selects an image
  // public onFileChanged(event) {
  //   //Select File
  //   this.selectedFile = event.target.files[0];
  // }
  onSelectFile(event) {
    let reader = new FileReader();
    this.selectedFile = event.target.files[0];   
    // if( event.target.files.length > 0) {
    // const file = event.target.files[0];
    // this.userFile=file;
    // this.form.get('profileimg').setValue(file);
    reader.readAsDataURL(this.selectedFile);
       reader.onload = (_event) => {
      this.imgUrl = reader.result
     // need to run CD since file load runs outside of zone
      // this.cd.markForCheck();
    };
  }

  submit(form) {
    const formData = new FormData();
    const users = form;
    formData.append('users', JSON.stringify(users))
    formData.append('file', this.selectedFile)
    // alert(this.form.value.isActive)
    // body.scheduledEnd=this.datePipe.transform(body.scheduledEnd,'yy-MM-dd');
    // this.user = form;
    this.accessServices.createUser(formData).subscribe(data => {
      console.log(data)
      this.sweetSuccessCreateUser()
    });
  }



  // submit(form) {

  //   // alert(this.form.value.isActive)

  //   // body.scheduledEnd=this.datePipe.transform(body.scheduledEnd,'yy-MM-dd');
  //   this.user = form;

  //   this.accessServices.createUser(this.user,this.selectedFile).subscribe(data => {
  //     console.log(data)
  //   });
  // }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    // Destroy the table first
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      // this.dtTrigger.next();
    }).then(() => {
      this.accessServices.findAll().subscribe((data) => {
        this.users = data;
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

  delete(user: Users) {
    // if (staff.id == undefined) {
    //   this.SwalCannotFindId();
    // } else {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        console.log(this.users);
        this.accessServices.deleteUser(user).subscribe(data => {
          this.users.splice(this.users.indexOf(user), 1);
          console.log(this.users);
          this.rerender();
        });
        Swal.fire({
          icon: 'success',
          title: 'Your item has been deleted.',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  SwalCannotRemoveThisItem() {
    var checkUser;
    var lenghtUserSessions = 0;
    // $SP().list("Sessions").get({
    //     fields: "ID,CoacheeID_x003a_Name, ScheduledStart, Status",
    //     where: "CoachID = '" + rowId + "' or CoacheeID= '" + rowId + "'"
    // }).then(function (data) {
    //     for (var i = 0; i < data.length; i++) {
    //         lenghtUserSessions = data.length
    //     }
    //     if (lenghtUserSessions > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'We are sorry that the item cannot be deleted because an item in sessions is related to this item',
    })
    // } else {
    //     Swal.fire({
    //         title: i18n[lang].Admin_Access_Mgmt.CRITitle,
    //         text: i18n[lang].Admin_Access_Mgmt.CRIText,
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: i18n[lang].Admin_Access_Mgmt.CRIBtnConfirm,
    //     }).then((result) => {
    //         if (result.value) {
    //             $SP().list("Users").remove({ ID: rowId });
    //             Swal.fire({
    //                Title: i18n[lang].Admin_Access_Mgmt.IRTitle,
    //                text:i18n[lang].Admin_Access_Mgmt.IRText,
    //                icon: 'success'
    //             })
    //             bodyUsersData.row('.selected').remove().draw(false);
    //         }
    //     })
    // }
    // })
  }
  public selectedRow: Users = new Users('', null, null, true, '', '', '', new Date, '', new Date, '', '');

  reset() {
    this.showBtnAddUser = true;
    this.showBtnUpdateUser = false;
    this.form.reset();
    this.formGroupElements();
    this.showUploadImg = true;
    this.imgUrl = null;
  }

  formGroupElements(){
    this.form = new FormGroup({
      // status: new FormControl(Status.SSN_Draft, Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      isActive: new FormControl(false, Validators.required),
      // file: new FormControl(null),
      password: new FormControl('', Validators.required),
      // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      role: new FormControl('', Validators.required),
      profile: new FormControl('', Validators.required),
      // managerEmail: new FormControl('', Validators.required),
      dateCeated: new FormControl(new Date(), Validators.required),
      // slotStart: new FormControl('', Validators.required),
      // slotEnd: new FormControl('', Validators.required),
      // scenarioAreaTerapeutica: new FormControl('', Validators.required),
      // scenarioKeyMessage: new FormControl('', Validators.required),
      // scenarioCompetitor: new FormControl('', Validators.required),
      // scenarioContext1: new FormControl('', Validators.required),
      // scenarioContext2: new FormControl('', Validators.required),
      // scenarioTerritorio: new FormControl('', Validators.required),
      // scenarioDigitalProfile: new FormControl('', Validators.required),
      // scenarioCMVProfile: new FormControl('', Validators.required),
      // scenarioAdoption: new FormControl('', Validators.required),
      // scenarioObiettivi: new FormControl('', Validators.required),
      // scenarioAgenda: new FormControl('', Validators.required),
    })
  }

  getElementByid(user) {
    this.showBtnAddUser = false;
    this.showBtnUpdateUser = true;
    this.showUploadImg = false;
    this.selectedRow = user;
    console.log(this.selectedRow)
    // if(user.id != null)
    this.accessServices.getbyid(user).subscribe((res) => {
      this.base64Data = res.picture;
      if (this.base64Data != null) {
        this.imgUrl = 'data:image/jpeg;base64,' + this.base64Data;
      } else {
        this.imgUrl = null;
      }
    });
    this.form = new FormGroup({
      // status: new FormControl(Status.SSN_Draft, Validators.required),
      name: new FormControl(this.selectedRow.name, Validators.required),
      email: new FormControl(this.selectedRow.email, [Validators.required, Validators.email]),
      isActive: new FormControl(this.selectedRow.isActive, Validators.required),
      // file: new FormControl(null),
      password: new FormControl(this.selectedRow.password, Validators.required),
      // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      role: new FormControl(this.selectedRow.role, Validators.required),
      profile: new FormControl(this.selectedRow.profile, Validators.required),
      // managerEmail: new FormControl('', Validators.required),
      dateCeated: new FormControl(this.selectedRow.dateCeated, Validators.required),

    });
    //   this.accessServices.getbyid(user).subscribe((res) => {
    //     this.usersres=res;
    //     this.retrieveResonse = res.picture;
    //     console.log(this.retrieveResonse)
    //     this.base64Data = res.picture;
    //     console.log(this.base64Data)
    //     this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    //   }
    // );
  }
  // @ViewChild('takeInput', { static: false })
  @ViewChild('closebutton', { static: true }) closebutton;

  edit(userEdit: Users) {
    // userEdit=this.form;
    userEdit.id = this.selectedRow.id;

    console.log(this.selectedRow.picture)
    // const uploadImageData = new FormData();
    // uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    console.log(this.imgUrl)
    // this.selectedFile=this.selectedRow.picture;
    // const formData = new FormData();
    // const users = this.form;
    // formData.append('users', JSON.stringify(users))
    // formData.append('users', JSON.stringify(userEdit))
    // @ViewChild('takeInput', { static: false })
    // formData.append('file', this.selectedFile)
    this.accessServices.updateUser(userEdit).subscribe((data) => {
      this.sweetSuccessUpdateUser()
    })
  }


  sweetSuccessUpdateUser() {
    this.rerender();
    this.closebutton.nativeElement.click();
    Swal.fire({
      title: 'Good job',
      text: "Your item has been updated",
      icon: 'success',
    })
  }

  sweetSuccessCreateUser() {
    this.rerender();
    this.closebutton.nativeElement.click();
    Swal.fire({
      title: 'Good job',
      text: "Your item has been created",
      icon: 'success',
    })
  }

  // submit(form) {
  //   // alert(this.form.value.isActive)
  //   // body.scheduledEnd=this.datePipe.transform(body.scheduledEnd,'yy-MM-dd');
  //   this.user = form;
  //   this.accessServices.createUser2(this.user,this.selectedFile).subscribe((response) => {
  //     if (response.status === 200) {
  //       this.message = 'Image uploaded successfully';
  //     } else {
  //       this.message = 'Image not uploaded successfully';
  //     }
  //   })
  // }


  //Gets called when the user clicks on submit to upload the image
  // onUpload() {
  //   // console.log(this.selectedFile);
  //   //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
  //   const uploadImageData = new FormData();
  //   uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

  //   //Make a call to the Spring Boot Application to save the image
  //   this.httpClient.post('https://mcprettycall.herokuapp.com/upload', uploadImageData, { observe: 'response' })
  //     .subscribe((response) => {
  //       if (response.status === 200) {
  //         this.message = 'Image uploaded successfully';
  //       } else {
  //         this.message = 'Image not uploaded successfully';
  //       }
  //     });
  // }

  //Gets called when the user clicks on retieve image button to get the image from back end
  // getImage() {
  //   //Make a call to Sprinf Boot to get the Image Bytes.
  //   this.httpClient.get('https://mcprettycall.herokuapp.com/getByIDImage?id=2').subscribe(
  //     res => {
  //       console.log(res)
  //       console.log('*************************')
  //       this.retrieveResonse = res;
  //       this.base64Data = this.retrieveResonse.picture;
  //       this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //     });
  // }

  // usersres: Users;
  // userres: Users = new Users('', null, null, true, '', '', '', new Date, '', new Date, '', '');

  // getImagebyid() {
  //   //Make a call to Sprinf Boot to get the Image Bytes.
  //   this.userres.id = 1;
  //   this.accessServices.getbyid(this.userres).subscribe((res) => {
  //     this.usersres = res;
  //     console.log(res)
  //     this.retrieveResonse = res.picture;
  //     console.log(this.retrieveResonse)
  //     this.base64Data = res.picture;
  //     console.log(this.base64Data)
  //     this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //   });
  // }

}
