import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeRoutingModule } from './income-routing.module';
import { IncomeListComponent } from './income-list/income-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwtListDynamicModule } from 'src/app/shared/components/swt-list-dynamic/swt-list-dynamic.module';
import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';
import { IncomeFormComponent } from './income-form/income-form.component';
import { SwtFormDynamicModule } from 'src/app/shared/components/swt-form-dynamic/swt-form-dynamic.module';
import { SwtComboboxModule } from 'src/app/shared/components/swt-combobox/swt-combobox.module';


@NgModule({
  declarations: [IncomeListComponent, IncomeFormComponent],
  imports: [
    CommonModule,
    IncomeRoutingModule,
    SharedModule,
    SwtListDynamicModule,
    SwtButtonModule,
    SwtFormDynamicModule,
    SwtComboboxModule,
  ]
})
export class IncomeModule { }
