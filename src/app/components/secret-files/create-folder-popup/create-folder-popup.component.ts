import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { ErrorMessageConstant } from 'src/app/shared/constants/common.constant';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-create-folder-popup',
  templateUrl: './create-folder-popup.component.html',
  styleUrls: ['./create-folder-popup.component.scss']
})
export class CreateFolderPopupComponent extends BaseComponent {

  newFolder = "";

  @ViewChild("createFolderBtn") createFolderBtn!: SwtButton;

  constructor(
    baseService: BaseService,
    public storageService: StorageService,
    public dialogRef: MatDialogRef<CreateFolderPopupComponent>
  ) {
    super(baseService);
  }

  createFolder() {
    if (this.newFolder.trim() !== '') {
      this.storageService.save("", [{ folderName: this.newFolder }]).subscribe(
        response => {
          this.createFolderBtn.isFinished = true;
          if (response.success) {
            this.newFolder = "";
            MessageBox.information(new Message(this, { content: "Tạo thư mục thành công" }));
          } else {
            MessageBox.information(new Message(this, { content: response.message }));
          }
          this.dialogRef.close();
        },
        () => MessageBox.information(new Message(this, { content: ErrorMessageConstant.HAS_ERROR_MESSAGE }))
      )
    }
    else {
      this.createFolderBtn.isFinished = true;
      SnackBar.openSnackBarWarning(new SnackBarParameter(this, "Tên thư mục không được để trống", '', 2000));
    }
  }

  createFolderOnEnter() {
    this.createFolderBtn.clickExecute(null);
  }
}
