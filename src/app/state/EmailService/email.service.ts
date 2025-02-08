import { Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
@Injectable({
  providedIn: 'root'
})
export class EmailServiceTsService {

  constructor() {

  }


  public sendEmail(emailData: any) {
    emailjs
      .send('service_h9vrh1p', 'template_6pg3266', emailData, {
        publicKey: 'GkXg11axyk3Ers9JG',
      })
      .then(
        () => {
          alert('Sent! We will get back to you shortly.');
        },
        (error) => {
          alert('FAILED...\n'+ error);
        },
      );
  }

}
