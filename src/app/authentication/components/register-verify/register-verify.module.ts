import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterVerifyRoutingModule } from './register-verify-routing.module';
import { RegisterVerifyComponent } from './register-verify.component';
import { VerifyFormModule } from '../../shared/components/verify-form/verify-form.module';

@NgModule({
  declarations: [RegisterVerifyComponent],
  imports: [
    CommonModule,
    RegisterVerifyRoutingModule,
    VerifyFormModule
  ],
  exports: [RegisterVerifyComponent]
})
export class RegisterVerifyModule { }
