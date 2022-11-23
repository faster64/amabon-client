import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarConverterRoutingModule } from './calendar-converter-routing.module';
import { CalendarConverterComponent } from './calendar-converter.component';


@NgModule({
  declarations: [CalendarConverterComponent],
  imports: [
    CommonModule,
    CalendarConverterRoutingModule
  ],
  exports: [CalendarConverterComponent]
})
export class CalendarConverterModule { }
