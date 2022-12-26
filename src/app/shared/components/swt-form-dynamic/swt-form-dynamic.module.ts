import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDynamicComponent } from './swt-form-dynamic.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { SwtButtonModule } from '../swt-button/swt-button.module';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxCheckBoxModule, DxDateBoxModule, DxFileUploaderModule, DxTextAreaModule } from 'devextreme-angular';
import { MatMenuModule } from '@angular/material/menu';
import { SwtComboboxModule } from '../swt-combobox/swt-combobox.module';

@NgModule({
  declarations: [FormDynamicComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SwtButtonModule,
    SwtComboboxModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxCheckBoxModule,
    DxFileUploaderModule,
    DxTextAreaModule,
    MatMenuModule
  ],
  exports: [FormDynamicComponent]
})
export class SwtFormDynamicModule { }
