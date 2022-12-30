import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieKey } from '../../constants/cookie.key';
import { SessionStorageKey } from '../../constants/sessionstorage.key';
import { CookieHelper } from '../../helpers/cookie.hepler';
import { BaseService } from '../../services/base/base.service';
import { Utility } from '../../utils/utility';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'swt-uploader',
  templateUrl: './swt-uploader.component.html',
  styleUrls: ['./swt-uploader.component.scss']
})
export class SwtUploaderComponent extends BaseComponent {

  formData = new FormData();

  @Input()
  allowedFileExtensions: string[] = Utility.videoExtensions.map(i => `.${i}`).concat(Utility.imageExtensions.map(i => `.${i}`));

  @Input()
  uploadMode = 'instantly';

  @Input()
  multiple = false;

  @Input()
  name = 'files';

  @Input()
  isDropZoneActive = false;

  @Input()
  imageSource = '';

  @Input()
  headers: any;

  @Input()
  uploadUrl = '';

  @Output()
  uploaded = new EventEmitter();

  textVisible = true;

  progressVisible = false;

  progressValue = 0;

  constructor(
    baseService: BaseService,
  ) {
    super(baseService);
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.onDropZoneEnter = this.onDropZoneEnter.bind(this);
    this.onDropZoneLeave = this.onDropZoneLeave.bind(this);
    this.onUploaded = this.onUploaded.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onUploadStarted = this.onUploadStarted.bind(this);

    this.headers = {
      'Authorization': 'Bearer ' + CookieHelper.getCookie(`${environment.team}_${CookieKey.ACCESS_TOKEN}`),
      "X-Secret-Key": CookieHelper.getCookie(`${environment.team}_${SessionStorageKey.SECRET_KEY}`) || ""
    };
  }

  onDropZoneEnter(e: any) {
    if (e.dropZoneElement.id === 'dropzone-external') { this.isDropZoneActive = true; }
  }

  onDropZoneLeave(e: any) {
    if (e.dropZoneElement.id === 'dropzone-external') { this.isDropZoneActive = false; }
  }

  onUploaded(e: any) {
    const file = e.file;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.isDropZoneActive = false;
      this.imageSource = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
    this.textVisible = false;
    this.progressVisible = false;
    this.progressValue = 0;

    this.uploaded.emit(e.request?.response);
  }

  onProgress(e: any) {
    this.progressValue = e.bytesLoaded / e.bytesTotal * 100;
  }

  onUploadStarted(e: any) {
    this.imageSource = '';
    this.progressVisible = true;
    this.textVisible = false;

    const file = e.file;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.isDropZoneActive = false;
      this.imageSource = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
  }

}
