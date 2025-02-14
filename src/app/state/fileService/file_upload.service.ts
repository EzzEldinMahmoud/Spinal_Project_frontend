import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  Flask_backendEndPoint, report_Create_Point } from '../../shared/Constants';
import {  BehaviorSubject, take } from 'rxjs';
interface results {
  emergency_level: string
}
@Injectable({
  providedIn: 'root'
})
export class AiModelUploadService {
  //this.router.navigate(["home"]);
  constructor(private  http: HttpClient,private router:Router) {

  }
  result$ = new BehaviorSubject<results | null>(null);
  async image_upload(image: File[]) {
    let fileList: File[] = image;

    if (fileList.length < 1) {
      return;
    }

    let file: File = fileList[0];
    let formData: FormData = new FormData();
    formData.append('file', file);  // Correctly appending the file

    let result_promise = await this.http.post(`${Flask_backendEndPoint}`, formData) // Don't set Content-Type manually
      .pipe(take(1))
      .toPromise();
      this.result$.next(result_promise as results);
      return result_promise;
  }

}
