import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwtFilterComponent } from './swt-filter.component';
import { SwtButtonModule } from '../swt-button/swt-button.module';
import { DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';



@NgModule({
  declarations: [SwtFilterComponent],
  imports: [
    CommonModule,
    SwtButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxNumberBoxModule,
  ],
  exports: [SwtFilterComponent]
})
export class SwtFilterModule { }
