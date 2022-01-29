import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/Appointment';
import { User } from 'src/app/model/User';
import { AccountService } from 'src/app/services/account.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements OnInit {
  admin = true;
  users:any;
  user:User;
  totalusers:number;
  listOfAppointments:Appointment[];
  authService:AuthService;
   userName=""
  appointmentForm :FormGroup;
  search:any;
  //pagination
  totalLength:number;
  page:number=1;
  //pdf
  pdfTable :any
  //time
  public now :Date = new Date();
  @ViewChild('content',{static:false}) el!: ElementRef;

  makePdf(){

  }



  constructor(

    private accountServices:AccountService,
    private router: Router,
    private authServices:AuthService,
    private appointmentService:AppointmentService,
    private fb:FormBuilder ) {

   }

  ngOnInit(): void {
    this.appointmentService.fetchAll().subscribe((appo)=>{
      this.listOfAppointments=appo;
      this.totalLength=appo.length;

      this.userName= this.authService.loggedUser



    });
    this.accountServices.fetchAll().subscribe((u)=>{
      this.users=u;
     /* this. totalusers= u.length; */
    });







    this.appointmentForm = this.fb.group({
      id:['',Validators.required],
      name:['',Validators.required],
      date :[',Validators.required'],
      place:['',Validators.required],

    });


  }
  get f() { return this.appointmentForm.controls; }

  handelSubmit(){
    this.appointmentService.addAppointment(this.appointmentForm.value).subscribe();


  }

  onRest(){
    this.appointmentForm.reset()
  }
  public delete(id:number){
   // this.appointmentService.delete(id).subscribe();


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'

      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!"+this.listOfAppointments[id],
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.delete(id).subscribe();
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your Appointment  has been deleted.',

        )
      } else if (

        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })



  }




  alert(){

     Swal.fire('Appointment Reminders and Confirmations Added ')


  }
  onLogout(){
    this.authServices.logout()

    this.router.navigate(['/']);
  }




}
