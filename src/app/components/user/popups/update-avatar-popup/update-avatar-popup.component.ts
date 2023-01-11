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
import { Utility } from 'src/app/shared/utils/utility';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-avatar-popup',
  templateUrl: './update-avatar-popup.component.html',
  styleUrls: ['./update-avatar-popup.component.scss']
})
export class UpdateAvatarPopupComponent extends BaseComponent {

  uploadUrl = `${environment.api_url}/ums/avatar/update-avatar`;

  allowedFileExtensions = Utility.imageExtensions.map(i => `.${i}`).join(",");

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
  }

  upload(event: any) {
    const formData = new FormData();
    (event as Array<File>).forEach(file => {
      formData.append('files', file, file.name);
    });
    this.baseService.takeOriginHttpClient().post<ServiceResult>(this.uploadUrl, formData).subscribe(response => {
      if (response) {
        if (response.success) {
          MessageBox.information(new Message(null, { content: 'Cập nhật ảnh đại diện thành công' }));
        } else {
          MessageBox.information(new Message(null, { content: ErrorMessageConstant.HAS_ERROR_MESSAGE }));
        }
      } else {
        MessageBox.information(new Message(null, { content: ErrorMessageConstant.HAS_ERROR_MESSAGE }));
      }
      this.dialogRef.close();
    })
  }
}
