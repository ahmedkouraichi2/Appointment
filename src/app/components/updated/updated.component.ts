import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/model/Appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";




@Component({
  selector: 'app-updated',
  templateUrl: './updated.component.html',
  styleUrls: ['./updated.component.css']
})
export class UpdatedComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;

  appointmentBeUpdated:Appointment;
  updateForm:FormGroup;
  id1:string;
  id:number



  constructor(private appointmentService:AppointmentService,
    private fb :FormBuilder,private  activatedRoute:ActivatedRoute,
    private  _location: Location,
   ) {

   }

  ngOnInit(): void {

    this.id1 = this.activatedRoute.snapshot.params['id'];
    this.id=parseInt(this.id1)


    this.appointmentService.findById(+this.id).subscribe(appointment =>
      this.appointmentBeUpdated = appointment);



      this.updateForm = this.fb.group({
        id:[''],
        name:[''],
        date :[''],
        place :[''],


      })


  }

  handelSubmitUpdate(){
    this.appointmentService.update(this.appointmentBeUpdated.id,this.updateForm.value).subscribe();
  }





  gobach(){
    this._location.back();
}

alert(){

  Swal.fire('Appointment has Updated ')


}

/*Maque a pdf*/
 makePdf(){

  let pdf= new jsPDF();
   pdf.text("Hello",10,10);
   pdf.save();

}

public downloadAsPDF() {


}

}
