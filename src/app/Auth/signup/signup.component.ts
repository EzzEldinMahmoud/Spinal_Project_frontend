import { RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceStateService } from '../../state/auth/auth-service-state.service';
import { HttpClientModule } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,HttpClientModule,ReactiveFormsModule,NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers:[AuthServiceStateService]
})
export class SignupComponent implements OnInit {
constructor(private authService:AuthServiceStateService) {}
    private formBuilder = inject(FormBuilder);
    ngOnInit(): void {

    }

    createForm = this.formBuilder.group
        ({email : ["",[Validators.required,Validators.email]],
          password : ["",[Validators.required,Validators.minLength(7)]],
          firstName : ["",[Validators.required,Validators.minLength(4)]],
          lastName : ["",[Validators.required,Validators.minLength(4)]],
          checkedTerm : [false,[Validators.required,Validators.requiredTrue]],

        })

    create () {
      let fullname = this.createForm.controls.firstName.value! + this.createForm.controls.lastName.value!;

      this.authService.create({email: this.createForm.controls.email.value!,password:this.createForm.controls.password.value!,name:fullname});
    }
}
