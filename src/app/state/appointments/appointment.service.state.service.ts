import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceStateService } from '../auth/auth-service-state.service';
import { Iappointment } from './interface/appointmentInterface';
import { appointmentDeletePoint, backendEndPoint, createAppointmentPostPoint, getAllAppointmentGETPoint, headers } from '../../shared/Constants';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentServiceStateService {
    // all of that needs refactoring as it is done hasty!!!!
    userid = "";
    create_appointment_endpoint = backendEndPoint+createAppointmentPostPoint;
    get_appointment_endpoint = backendEndPoint+getAllAppointmentGETPoint;
    get_single_appointment_endpoint = backendEndPoint+getAllAppointmentGETPoint;
    deleteOne_appointment = backendEndPoint+appointmentDeletePoint;


    constructor(private  http: HttpClient,private router:Router,private authService:AuthServiceStateService) {
      if(localStorage.getItem("userId") !== null) {
        this.userid = localStorage.getItem("userId")!;
        this.create_appointment_endpoint = this.create_appointment_endpoint+this.userid;
        this.get_appointment_endpoint = this.get_appointment_endpoint +this.userid;
        this.get_single_appointment_endpoint = this.get_single_appointment_endpoint+this.userid;
        this.deleteOne_appointment = this.deleteOne_appointment+this.userid;

      }

    }

    create_appointment(appointmentDetails:Iappointment) {
        console.log('====================================');
        console.log({
          "patient_id": this.userid,
          "appointment_time": appointmentDetails.appointment_date + " " + appointmentDetails.appointment_time,
          "reportDetails": appointmentDetails.reportId ? appointmentDetails.reportId : '',
          "appointmentDetails":appointmentDetails.appointmentDetails,
          "status":appointmentDetails.status
        });
        console.log('====================================');
        this.http.post(this.create_appointment_endpoint,{
          "patient_id": this.userid,
          "appointment_time": appointmentDetails.appointment_date + " " + appointmentDetails.appointment_time,
          "reportDetails": appointmentDetails.reportId == "There are no Reports." ? null: appointmentDetails.reportId ,
          "appointmentDetails":appointmentDetails.appointmentDetails,
          "status":appointmentDetails.status
        },{
          headers:headers
        }).pipe(take(1)).subscribe((createdAppointment)=>{

        });

    }
    //needs refactor as asp.net have different patch req body.
    //don't use for now
    update_appointment(appointmentDetails:Iappointment) {

/* {
        "status": 0,
        "patient_id": "string",
        "appointment_time": "string",
        "reportDetails": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      } */

        let appointment = this.http.patch(this.create_appointment_endpoint,{
          "status": appointmentDetails.status,
          "patient_id": this.userid,
          "appointment_date": appointmentDetails.appointment_date,
          "appointment_time": appointmentDetails.appointment_time,
          "reportDetails": appointmentDetails.reportId,
          "appointmentDetails":appointmentDetails.appointmentDetails

        },{
          headers:headers
        }).pipe(take(1)).toPromise();
        let createdAppointment = appointment.then(appointment => {
          return appointment;
        }).catch(err=>{
          alert("Something went wrong!" + err);
        });
        return createdAppointment;
    }

    getAll_appointment():Promise<Iappointment[]> {
      return this.http.get(this.get_appointment_endpoint).pipe(take(1)).toPromise() as Promise<Iappointment[]> ;
    }
    getOne_appointment(appointmentId:string): Promise<Iappointment> {
      return this.http.get(this.get_single_appointment_endpoint +appointmentId).pipe(take(1)).toPromise() as Promise<Iappointment>;
    }
    //done but don't even think of using it.
    delete_appointment(appointmentId:string) {
      return this.http.delete(this.deleteOne_appointment +appointmentId).pipe(take(1)).toPromise();

    }

}
