import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwtUploaderComponent } from './swt-uploader.component';
import { DxFileUploaderModule, DxProgressBarModule } from 'devextreme-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SwtButtonModule } from '../swt-button/swt-button.module';

@NgModule({
  declarations: [SwtUploaderComponent],
  imports: [
    CommonModule,
    DxFileUploaderModule,
    DxProgressBarModule,
    NgxDropzoneModule,
    SwtButtonModule,
  ],
  exports: [SwtUploaderComponent]
})
export class SwtUploaderModule { }
