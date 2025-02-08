import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailServiceTsService } from '../../state/EmailService/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers:[]
})
export class ContactComponent {
  constructor(private emailService:EmailServiceTsService){

  }
  private formBuilder = inject(FormBuilder);


      contactEmailForm = this.formBuilder.group
          ({email: ["",[Validators.required,Validators.email]],
            message : ["",[Validators.required,Validators.minLength(7)]],
            firstName : ["",[Validators.required,Validators.minLength(4)]],
            lastName : ["",[Validators.required,Validators.minLength(4)]],
            subject : ["",[Validators.required]],
            phone_number : ["",[Validators.required]],
          })

    sendEmail(){
      if(!this.contactEmailForm.valid) {
        alert("Please fill all fields before sending!");
      }else {
        let formControllers = this.contactEmailForm.controls;
      let emailDate = {
        "user_email":formControllers.email.value,
        "user_name":formControllers.firstName.value+' '+formControllers.lastName.value,
        "phone_number":formControllers.phone_number.value,
        "subject":formControllers.subject.value,
        "message":formControllers.message.value
      }
      this.emailService.sendEmail(emailDate);
      }

    }

}
