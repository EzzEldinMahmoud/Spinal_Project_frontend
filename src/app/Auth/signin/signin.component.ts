import { RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthServiceStateService } from '../../state/auth/auth-service-state.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,HttpClientModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  providers:[AuthServiceStateService]
})
export class SigninComponent implements OnInit{
    constructor(private authService:AuthServiceStateService) {}
    private formBuilder = inject(FormBuilder);
    ngOnInit(): void {

    }

  loginForm = this.formBuilder.group
        ({emailAddress : ["",[Validators.required,Validators.email]],
          password : ["",[Validators.required,Validators.minLength(7)]],})

    login () {

      this.authService.login(this.loginForm.controls.emailAddress.value!,this.loginForm.controls.password.value!);
    }



}
