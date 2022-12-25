import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretFilesRoutingModule } from './secret-files-routing.module';
import { SecretFilesComponent } from './secret-files.component';
import { DxCheckBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';
import { SwtLoadingModule } from 'src/app/shared/components/loading/swt-loading.module';
import { FilesInFolderComponent } from './files-in-folder/files-in-folder.component';
import { MatMenuModule } from '@angular/material/menu';
import { SwtUploaderModule } from 'src/app/shared/components/swt-uploader/swt-uploader.module';
import { StorageUploadPopupComponent } from './storage-upload-popup/storage-upload-popup.component';
import { SwtListDynamicModule } from 'src/app/shared/components/swt-list-dynamic/swt-list-dynamic.module';
import { CreateFolderPopupComponent } from './create-folder-popup/create-folder-popup.component';

@NgModule({
  declarations: [SecretFilesComponent, FilesInFolderComponent, StorageUploadPopupComponent, CreateFolderPopupComponent],
  imports: [
    CommonModule,
    SecretFilesRoutingModule,
    DxTextBoxModule,
    DxCheckBoxModule,
    SwtButtonModule,
    SwtLoadingModule,
    SwtUploaderModule,
    SwtListDynamicModule,
    MatMenuModule,
  ],
  exports: [SecretFilesComponent, FilesInFolderComponent],
})
export class SecretFilesModule { }
