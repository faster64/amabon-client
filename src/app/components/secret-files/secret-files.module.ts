import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretFilesRoutingModule } from './secret-files-routing.module';
import { SecretFilesComponent } from './secret-files.component';
import { DxCheckBoxModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';
import { SwtLoadingModule } from 'src/app/shared/components/loading/swt-loading.module';
import { FilesInFolderComponent } from './files-in-folder/files-in-folder.component';
import { MatMenuModule } from '@angular/material/menu';
import { SwtUploaderModule } from 'src/app/shared/components/swt-uploader/swt-uploader.module';
import { StorageUploadPopupComponent } from './storage-upload-popup/storage-upload-popup.component';
import { SwtListDynamicModule } from 'src/app/shared/components/swt-list-dynamic/swt-list-dynamic.module';
import { CreateFolderPopupComponent } from './folder-popup/folder-popup.component';
import { MoveFilePopupComponent } from './move-file-popup/move-file-popup.component';
import { SwtComboboxModule } from 'src/app/shared/components/swt-combobox/swt-combobox.module';
import { StorageListComponent } from './storage-list/storage-list.component';
import { SwtGridModule } from 'src/app/shared/components/swt-grid/swt-grid.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SecretFilesComponent, FilesInFolderComponent, StorageUploadPopupComponent, CreateFolderPopupComponent, MoveFilePopupComponent, StorageListComponent],
  imports: [
    CommonModule,
    SecretFilesRoutingModule,
    SharedModule,
    DxTextBoxModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    SwtButtonModule,
    SwtLoadingModule,
    SwtUploaderModule,
    SwtListDynamicModule,
    SwtGridModule,
    SwtComboboxModule,
    MatMenuModule,
  ],
  exports: [SecretFilesComponent, FilesInFolderComponent],
})
export class SecretFilesModule { }
