import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { Folder } from 'src/app/shared/models/storage/folder/folder.model';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { Url } from '../files-in-folder/files-in-folder.component';

@Component({
  selector: 'app-move-file-popup',
  templateUrl: './move-file-popup.component.html',
  styleUrls: ['./move-file-popup.component.scss']
})
export class MoveFilePopupComponent extends BaseComponent {

  isFetching = false;

  folders: Folder[] = [];

  folderSelected = "";

  srcFolder!: Folder;

  @ViewChild("moveBtn")
  moveBtn!: SwtButton;

  constructor(
    baseService: BaseService,
    public storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MoveFilePopupComponent>
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initData() {
    super.initData();
    this.getFolder(this.data.folder);
  }

  getFolder(folder: any) {
    this.isLoading = true;
    this.storageService.getFolderByName(folder).subscribe(response => {
      this.isLoading = false;
      if (response.success) {
        this.srcFolder = response.data;
      }
    });
  }

  onOpened(e: any) {
    this.isFetching = true;
    this.storageService.getAll().subscribe(
      response => {
        this.isFetching = false;
        if (response.success) {
          this.folders = response.data.filter((f: any) => f.folderName !== this.data.folder);
        } else {
          MessageBox.information(new Message(this, { content: response.message }))
        }
      },
      () => this.isFetching = false
    );
  }

  onValueChanged(e: any) {
    this.folderSelected = e.value.id;
  }

  move() {
    if (this.folderSelected == '') {
      this.moveBtn.isFinished = true;
      SnackBar.openSnackBarWarning(new SnackBarParameter(this, "Vui lòng chọn thư mục đích"));
      return;
    }

    const fileNames = this.data.files.filter((f: Url) => f.checked).map((f: Url) => f.fileName);
    if (!fileNames.length) {
      this.moveBtn.isFinished = true;
      SnackBar.openSnackBarWarning(new SnackBarParameter(this, "Vui lòng chọn tệp cần di chuyển"));
      return;
    }

    this.storageService.moveFiles(this.srcFolder.id, this.folderSelected, fileNames).subscribe(
      response => {
        this.moveBtn.isFinished = true;
        if (response.success) {
          MessageBox.information(new Message(this, { content: "Di chuyển tệp thành công" }));
          this.dialogRef.close(true);
        } else {
          MessageBox.information(new Message(this, { content: response.message }));
        }
      },
      () => this.moveBtn.isFinished = true
    );
  }

}
