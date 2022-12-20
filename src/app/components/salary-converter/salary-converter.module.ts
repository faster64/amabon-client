import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryConverterRoutingModule } from './salary-converter-routing.module';
import { SalaryConverterComponent } from './salary-converter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DxNumberBoxModule, DxRadioGroupModule, DxTextBoxModule } from 'devextreme-angular';
import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';


@NgModule({
  declarations: [SalaryConverterComponent],
  imports: [
    CommonModule,
    SalaryConverterRoutingModule,
    SharedModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxRadioGroupModule,
    SwtButtonModule,
  ],
  exports: [SalaryConverterComponent],
})
export class SalaryConverterModule { }
