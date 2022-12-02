import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginVerificationRoutingModule } from './login-verification-routing.module';
import { OtpBoxModule } from 'src/app/shared/components/swt-otp-box/otp-box.module';
import { LoginVerificationComponent } from './login-verification.component';


@NgModule({
  declarations: [LoginVerificationComponent],
  imports: [
    CommonModule,
    LoginVerificationRoutingModule,
    OtpBoxModule,
  ],
  exports: [LoginVerificationComponent],
})
export class LoginVerificationModule { }
