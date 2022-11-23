import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxCheckBoxModule, DxHtmlEditorModule, DxSelectBoxModule } from 'devextreme-angular';
import { SwtEditorComponent } from './swt-editor.component';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [SwtEditorComponent],
  imports: [
    CommonModule,
    DxHtmlEditorModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    MatTooltipModule
  ],
  exports: [SwtEditorComponent],
})
export class SwtEditorModule { }
