import { Time } from "@angular/common";

export interface Iappointment {
  status?:number,
  patientId?:string,
  reportId?:string,
  appointment_date:Date,
  appointment_time:string
  appointmentDetails:string

}
