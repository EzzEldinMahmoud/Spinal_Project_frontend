import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { backendEndPoint, authLoginPoint, headers, authCreatePoint, getUserPoint } from '../../shared/Constants';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from './interface/auth.create';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceStateService {

  constructor(private  http: HttpClient,private router:Router) { }
  userId$ = new BehaviorSubject<string>("");
  user$ = new BehaviorSubject<CreateUser | null>(null);


  login ( email:string,password:string) {
    if (!this.validate( email,password)){
        return alert("enter valid email and password");
    } else {
        let loginReq:Promise<string> = this.http.post(backendEndPoint + authLoginPoint,{email_address:email,password:password},{
            headers:headers
        }).pipe(take(1)).toPromise() as Promise<string>;

        loginReq.then((userId)=>{
            this.userId$.next(userId);
            this.router.navigate(["home"]);
            localStorage.setItem("userId",userId);
            console.log(localStorage.getItem("userId"));

            return;

        });

    }
  }
  create(user:CreateUser) {
    if (!this.validate( user.email,user.password,user.name)){
      return alert("enter valid email or password or name");
    } else {
      let CreateReq:Promise<string> = this.http.post(backendEndPoint + authCreatePoint,{email_address:user.email,password:user.password,name:user.name},{
          headers:headers
      }).pipe(take(1)).toPromise() as Promise<string>;

      CreateReq.then((userId)=>{
          this.userId$.next(userId);
          this.router.navigate(["home"]);
          localStorage.setItem("userId",userId);
          return;

      }).catch(error => {
        console.log(error);
      });

  }
  }

  getUser() {
    this.http.get(backendEndPoint + getUserPoint + this.userId$.value,{
        headers:headers
    }).pipe(take(1)).subscribe((user:any)=>{
      this.user$.next(user);

    });

  }
  validate( email: string,password:string,name?:string) {
    if(!email.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) || password.length >= 8 || name!.length >= 3) {
      return true;
    } else {return false;}
  }
}
