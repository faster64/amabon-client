import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DxFileUploaderComponent } from 'devextreme-angular';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { CommonConstant, ErrorMessageConstant } from 'src/app/shared/constants/common.constant';
import { CookieKey } from 'src/app/shared/constants/cookie.key';
import { CookieHelper } from 'src/app/shared/helpers/cookie.hepler';
import { ServiceResult } from 'src/app/shared/models/base/service-result';
import { Message } from 'src/app/shared/models/message/message';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { AvatarService } from 'src/app/shared/services/user/avatar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-avatar-popup',
  templateUrl: './update-avatar-popup.component.html',
  styleUrls: ['./update-avatar-popup.component.scss']
})
export class UpdateAvatarPopupComponent extends BaseComponent {

  formData = new FormData();

  isDropZoneActive = false;

  imageSource = '';

  textVisible = true;

  progressVisible = false;

  progressValue = 0;

  headers: any;

  @ViewChild("fileUploader")
  fileUploader!: DxFileUploaderComponent;

  constructor(
    baseService: BaseService,
    public avatarService: AvatarService,
    public dialogRef: MatDialogRef<UpdateAvatarPopupComponent>
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
    this.headers = { 'Authorization': 'Bearer ' + CookieHelper.getCookie(`${environment.team}_${CookieKey.ACCESS_TOKEN}`) };
  }

  saveFiles() {
    // const header = new HttpHeaders();
    // header.append('Content-Type', 'undefined');

    // this.avatarService.updateAvatar(this.formData).subscribe(
    //   response => {
    //     this.saveFileBtn.isFinished = true;
    //     this.fileInput.nativeElement.value = null;
    //     if (response.success) {
    //       MessageBox.information(new Message(null, { content: "Uploaded successfully!" }));
    //     } else {
    //       MessageBox.information(new Message(null, { content: response.message }));
    //     }
    //   },
    //   error => MessageBox.information(new Message(null, { content: JSON.stringify(error) }))
    // );
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

    if (e.request?.response) {
      const result = JSON.parse(e.request.response) as ServiceResult;
      if (result.success) {
        MessageBox.information(new Message(null, { content: 'Cập nhật ảnh đại diện thành công' }));
      } else {
        MessageBox.information(new Message(null, { content: ErrorMessageConstant.HAS_ERROR_MESSAGE }));
      }
    } else {
      MessageBox.information(new Message(null, { content: ErrorMessageConstant.HAS_ERROR_MESSAGE }));
    }

    this.dialogRef.close();
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
