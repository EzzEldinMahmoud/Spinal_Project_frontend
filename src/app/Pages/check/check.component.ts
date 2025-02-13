import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { AiModelUploadService } from '../../state/fileService/file_upload.service';
import { CommonModule } from '@angular/common';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-check',
  standalone: true,
  imports: [RouterLink,FileUpload, ToastModule, ButtonModule,CommonModule],
  providers:[MessageService,AiModelUploadService],
  templateUrl: './check.component.html',
  styleUrl: './check.component.scss'
})
export class CheckComponent {
  constructor(private messageService: MessageService,private imageupload:AiModelUploadService) {}
  imagefile = signal(false);
  onUpload(event:any) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded and Processing...' });
    this.imageupload.image_upload(event.target.files);
}
}
