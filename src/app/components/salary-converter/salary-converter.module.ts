import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryConverterRoutingModule } from './salary-converter-routing.module';
import { SalaryConverterComponent } from './salary-converter.component';


@NgModule({
  declarations: [SalaryConverterComponent],
  imports: [
    CommonModule,
    SalaryConverterRoutingModule
  ],
  exports: [SalaryConverterComponent],
})
export class SalaryConverterModule { }
