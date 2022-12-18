import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwtUploaderComponent } from './swt-uploader.component';
import { DxFileUploaderModule, DxProgressBarModule } from 'devextreme-angular';

@NgModule({
  declarations: [SwtUploaderComponent],
  imports: [
    CommonModule,
    DxFileUploaderModule,
    DxProgressBarModule,
  ],
  exports: [SwtUploaderComponent]
})
export class SwtUploaderModule { }
