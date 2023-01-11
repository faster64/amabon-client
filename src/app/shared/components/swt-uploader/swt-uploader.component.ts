import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieKey } from '../../constants/cookie.key';
import { SessionStorageKey } from '../../constants/sessionstorage.key';
import { CookieHelper } from '../../helpers/cookie.hepler';
import { BaseService } from '../../services/base/base.service';
import { Utility } from '../../utils/utility';
import { BaseComponent } from '../base-component';
import { SwtButton } from '../swt-button/swt-button.component';

@Component({
  selector: 'swt-uploader',
  templateUrl: './swt-uploader.component.html',
  styleUrls: ['./swt-uploader.component.scss']
})
export class SwtUploaderComponent implements OnInit {

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

  @Output()
  onUpload = new EventEmitter();

  @ViewChild("uploadBtn")
  uploadBtn!: SwtButton;

  files: File[] = [];

  constructor() {
  }
  ngOnInit() {
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    if(this.emitAutomatically) {
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
