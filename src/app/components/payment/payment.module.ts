import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentCategoryFormComponent } from './payment-category-form/payment-category-form.component';
import { PaymentCategoryListComponent } from './payment-category-list/payment-category-list.component';
import { PaymentListDynamicComponent } from './payment-list-dynamic/payment-list-dynamic.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwtListDynamicModule } from 'src/app/shared/components/swt-list-dynamic/swt-list-dynamic.module';
import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';
import { SwtFormDynamicModule } from 'src/app/shared/components/swt-form-dynamic/swt-form-dynamic.module';
import { SwtComboboxModule } from 'src/app/shared/components/swt-combobox/swt-combobox.module';
import { SwtGridModule } from 'src/app/shared/components/swt-grid/swt-grid.module';
import { SwtWindowModule } from 'src/app/shared/components/swt-window/swt-window.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { DxTextBoxModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentFormComponent,
    PaymentCategoryFormComponent,
    PaymentCategoryListComponent,
    PaymentListDynamicComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
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
  ]
})
export class PaymentModule { }
