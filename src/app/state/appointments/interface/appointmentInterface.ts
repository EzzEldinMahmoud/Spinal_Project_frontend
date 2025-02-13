import { Time } from "@angular/common";

export interface Iappointment {
  status?:string,
  patientId?:string,
  reportId?:string,
  appointment_date:Date,
  appointment_time:string
  appointmentDetails:string

}
