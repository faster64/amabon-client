import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterV2RoutingModule } from './register-v2-routing.module';
import { RegisterV2Component } from './register-v2.component';
import { RegisterStep1Component } from './register-step1/register-step1.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';
import { DxNumberBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { RegisterStep2Component } from './register-step2/register-step2.component';
import { RegisterStep3Component } from './register-step3/register-step3.component';
import { RegisterStep4Component } from './register-step4/register-step4.component';
import { RegisterCompletedComponent } from './register-completed/register-completed.component';


@NgModule({
  declarations: [
    RegisterV2Component,
    RegisterStep1Component,
    RegisterStep2Component,
    RegisterStep3Component,
    RegisterStep4Component,
    RegisterCompletedComponent,
  ],
  imports: [
    CommonModule,
    RegisterV2RoutingModule,
    SharedModule,
    SwtButtonModule,
    DxTextBoxModule,
    DxNumberBoxModule,
  ]
})
export class RegisterV2Module { }
