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
import { IncomeListDynamicComponent } from './income-list-dynamic/income-list-dynamic.component';
import { SwtGridModule } from 'src/app/shared/components/swt-grid/swt-grid.module';
import { SwtWindowModule } from 'src/app/shared/components/swt-window/swt-window.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { DxCheckBoxModule, DxDateBoxModule, DxNumberBoxModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { IncomeCategoryListComponent } from './income-category-list/income-category-list.component';
import { IncomeCategoryFormComponent } from './income-category-form/income-category-form.component';
import { IncomeFormDynamicComponent } from './income-form-dynamic/income-form-dynamic.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [IncomeListComponent, IncomeFormComponent, IncomeListDynamicComponent, IncomeCategoryListComponent, IncomeCategoryFormComponent, IncomeFormDynamicComponent],
  imports: [
    CommonModule,
    FormsModule,
    IncomeRoutingModule,
    SharedModule,
    SwtListDynamicModule,
    SwtButtonModule,
    SwtFormDynamicModule,
    SwtComboboxModule,
    SwtButtonModule,
    SwtGridModule,
    SwtWindowModule,
    MatMenuModule,
    MatCardModule,
    MatRadioModule,
    SwtWindowModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxCheckBoxModule,
    DxTextAreaModule,
  ]
})
export class IncomeModule { }
