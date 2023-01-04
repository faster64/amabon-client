import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { ErrorMessageConstant } from 'src/app/shared/constants/common.constant';
import { SessionStorageKey } from 'src/app/shared/constants/sessionstorage.key';
import { FormMode } from 'src/app/shared/enumerations/common.enum';
import { CookieHelper } from 'src/app/shared/helpers/cookie.hepler';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { ServiceResult } from 'src/app/shared/models/base/service-result';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-folder-popup',
  templateUrl: './folder-popup.component.html',
  styleUrls: ['./folder-popup.component.scss']
})
export class CreateFolderPopupComponent extends BaseComponent {
  FormMode = FormMode;

  folderName = "";

  mode = FormMode.Add;

  @ViewChild("createFolderBtn") createFolderBtn!: SwtButton;

  @ViewChild("updateFolderBtn") updateFolderBtn!: SwtButton;

  constructor(
    baseService: BaseService,
    public storageService: StorageService,
    public dialogRef: MatDialogRef<CreateFolderPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(baseService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.data != null) {
      this.mode = this.data.mode;
      this.folderName = this.data.folder.folderName;
    }
  }

  createFolder() {
    if (this.folderName.trim() !== '') {
      this.storageService.save("", [{ folderName: this.folderName }]).subscribe(
        response => {
          this.createFolderBtn.isFinished = true;
          if (response.success) {
            this.folderName = "";
            MessageBox.information(new Message(this, { content: "Tạo thư mục thành công" }));
          } else {
            MessageBox.information(new Message(this, { content: response.message }));
          }
          this.dialogRef.close(true);
        },
        () => MessageBox.information(new Message(this, { content: ErrorMessageConstant.HAS_ERROR_MESSAGE }))
      )
    }
    else {
      this.createFolderBtn.isFinished = true;
      SnackBar.openSnackBarWarning(new SnackBarParameter(this, "Tên thư mục không được để trống", '', 2000));
    }
  }

  updateFolder() {
    if (StringHelper.isNullOrEmpty(this.folderName)) {
      this.updateFolderBtn.isFinished = true;
      SnackBar.openSnackBarWarning(new SnackBarParameter(this, "Tên thư mục không được để trống", '', 2000));

    } else {
      this.data.folder.folderName = this.folderName;

      const url = `${this.storageService.getApiUrl()}/${this.storageService.serviceName}/${this.storageService.controller}/update`;
      this.storageService.takeOriginHttpClient().put<ServiceResult>(url, this.data.folder, {
        headers: {
          "X-Secret-Key": CookieHelper.getCookie(`${environment.team}_${SessionStorageKey.SECRET_KEY}`) || ""
        }
      }).subscribe(
        response => {
          this.updateFolderBtn.isFinished = true;
          if (response.success) {
            this.folderName = "";
            MessageBox.information(new Message(this, { content: "Cập nhật thư mục thành công" }));
          } else {
            MessageBox.information(new Message(this, { content: response.message }));
          }
          this.dialogRef.close(true);
        },
        () => MessageBox.information(new Message(this, { content: ErrorMessageConstant.HAS_ERROR_MESSAGE }))
      )
    }
  }

  createFolderOnEnter() {
    this.createFolderBtn.clickExecute(null);
  }
}
