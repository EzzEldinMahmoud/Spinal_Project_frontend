import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { AiModelUploadService } from '../../state/fileService/file_upload.service';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface results {
  emergency_level: string
}
@Component({
  selector: 'app-check',
  standalone: true,
  imports: [RouterLink,FileUpload, ToastModule, ButtonModule,NgIf,HttpClientModule],
  providers:[MessageService,AiModelUploadService],
  templateUrl: './check.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './check.component.scss'
})
export class CheckComponent {
  constructor(private messageService: MessageService,private imageupload:AiModelUploadService,private ref: ChangeDetectorRef) {}
  results:WritableSignal<results | null> = signal(null);
  xRayImage:WritableSignal<string> = signal('');

  onSelectFile(event: FileUploadEvent) { // called each time file input changes
    if (event.files && event.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.xRayImage.set(event.target!.result as string);
      }
    }
}
  onUpload(event:FileUploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded and Processing...' });
    this.imageupload.image_upload(event.files).then(result =>{
      this.onSelectFile(event)
      this.results.set(result as results);
    }).catch(e=>{
      console.log('====================================');
      console.error(e);
      console.log('====================================');

    })

    this.ref.markForCheck();
}
}
