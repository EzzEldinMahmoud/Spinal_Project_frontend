import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthServiceStateService } from '../../state/auth/auth-service-state.service';
import { AppointmentServiceStateService } from '../../state/appointments/appointment.service.state.service';
import { Iappointment } from '../../state/appointments/interface/appointmentInterface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reservation',
  standalone: true,
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
  imports: [RouterLink,HttpClientModule,ReactiveFormsModule,NgClass,NgFor,NgIf],
  providers:[AppointmentServiceStateService,AuthServiceStateService]
})
export class ReservationComponent {
private formBuilder = inject(FormBuilder);
constructor(private appointmentService:AppointmentServiceStateService,private authService:AuthServiceStateService){}
    report_list = new BehaviorSubject<string[]>([
    ]);
    appointment_list = new BehaviorSubject<Iappointment[]>([]);

    singleAppointment = new BehaviorSubject<Iappointment>({
          status: 3,
          patientId: "",
          appointment_date: new Date(),
          appointment_time: "",
          reportId: "",
          appointmentDetails: ""

    });
    userLogged = false;
    ngOnInit(): void {
      if (this.authService.userId$.value.length !== 0) {
          this.getAll();

          this.userLogged = true;
      }
    }
    createAppointmentForm = this.formBuilder.group
        ({
          status : [3],
          appointment_date : [new Date(),[Validators.required]],
          appointmentDetails: ["",[Validators.required]],

          appointment_time : ["",[Validators.required]],
          reportId : [""],

        });
        controls = this.createAppointmentForm.controls;

    create() {

      let created_appointment = this.appointmentService.create_appointment({
        status: this.controls.status.value!,
        appointment_time: this.controls.appointment_time.value!,
        appointment_date: this.controls.appointment_date.value!,

        reportId: this.controls.reportId.value!,
        appointmentDetails:this.controls.appointmentDetails.value!
      });
      return created_appointment;
    }
    getAll() {
      this.appointmentService.getAll_appointment().then((list:Iappointment[]) =>{
        return this.appointment_list.next(list);
      });
      return this.appointment_list.value;
    }

    getOne(AppointmentId:string):Iappointment {
      this.appointmentService.getOne_appointment(AppointmentId).then(
          appointment => {
              return this.singleAppointment.next(appointment);
          }
      )
      return this.singleAppointment.value;
    }
}
