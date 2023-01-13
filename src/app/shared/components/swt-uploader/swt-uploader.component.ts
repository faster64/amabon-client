import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgxDropzoneComponent } from 'ngx-dropzone';
import { Utility } from '../../utils/utility';
import { SwtButton } from '../swt-button/swt-button.component';

@Component({
  selector: 'swt-uploader',
  templateUrl: './swt-uploader.component.html',
  styleUrls: ['./swt-uploader.component.scss']
})
export class SwtUploaderComponent implements OnInit, AfterViewInit {

  formData = new FormData();

  @Input()
  allowedFileExtensions = Utility.videoExtensions.map(i => `.${i}`).concat(Utility.imageExtensions.map(i => `.${i}`)).join(",");

  @Input()
  disabled = false;

  @Input()
  multiple = false;

  @Input()
  uploadUrl = '';

  @Input()
  emitAutomatically = false;

  @Input()
  files: File[] = [];

  @Output()
  onUpload = new EventEmitter();

  @ViewChild("uploadBtn")
  uploadBtn!: SwtButton;

  @ViewChild("dropzone")
  dropzone!: NgxDropzoneComponent;


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const url = 'https://amabon-s3.s3.ap-southeast-1.amazonaws.com/amabon/c4834021-7e4c-476d-83c5-80cfb9ee598f.jpg?AWSAccessKeyId=AKIAYD7XRCZIY4PC7FEI&Expires=1705113859&Signature=e1bc%2B09rx%2FcPNrNQYvjwgnQXI1I%3D';
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    if (this.emitAutomatically) {
      this.upload();
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  upload() {
    this.onUpload.emit(this.files);
  }
}
