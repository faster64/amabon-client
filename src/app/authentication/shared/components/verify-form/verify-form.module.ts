import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';
import { VerifyFormComponent } from './verify-form.component';
import { VerifyBoxModule } from '../verify-box/verify-box.module';


@NgModule({
  declarations: [VerifyFormComponent],
  imports: [
    CommonModule,
    VerifyBoxModule,
    SwtButtonModule
  ],
  exports: [VerifyFormComponent],
})
export class VerifyFormModule { }
