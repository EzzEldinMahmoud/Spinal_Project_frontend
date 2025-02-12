import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  Flask_backendEndPoint, report_Create_Point } from '../../shared/Constants';
import {  take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AiModelUploadService {
  //this.router.navigate(["home"]);
  constructor(private  http: HttpClient,private router:Router) {

  }

  image_upload(image:File[]) {
    let fileList: File[] = image;

    if (fileList.length < 1) {
      return;
    }

    let file: File = fileList[0];
    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name)

    let headersData = {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    };
    this.http.post(`${Flask_backendEndPoint}`, formData,{
      headers: headersData
    })
        .pipe(take(1))
        .subscribe(
            data => alert('success'+ data),
            error => console.log(error)
        );
}

}
