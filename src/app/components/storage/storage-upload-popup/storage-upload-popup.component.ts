import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { ServiceResult } from 'src/app/shared/models/base/service-result';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-storage-upload-popup',
  templateUrl: './storage-upload-popup.component.html',
  styleUrls: ['./storage-upload-popup.component.scss']
})
export class StorageUploadPopupComponent extends BaseComponent {

  folderName = '';

  uploadUrl = '';

  constructor(
    baseService: BaseService,
    public storageService: StorageService,
    public activatedRoute: ActivatedRoute,
    public diaglog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { folderName: string, dialogRef: any },
    public dialogRef: MatDialogRef<StorageUploadPopupComponent>
  ) {
    super(baseService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  initData() {
    this.folderName = this.data.folderName;
    this.uploadUrl = `${this.baseService.getApiUrl()}/${this.storageService.serviceName}/storage/upload?folder=${this.folderName}`;
  }

  upload(e: any) {
    const formData = new FormData();
    (e as Array<File>).forEach(file => {
      formData.append('files', file, file.name);
    });
    this.storageService.upload(this.folderName, formData).subscribe( response => {
      this.dialogRef.close(response);
    })
  }
}
