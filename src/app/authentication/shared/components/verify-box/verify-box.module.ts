import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyBoxComponent } from './verify-box.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [VerifyBoxComponent],
  imports: [
    CommonModule,
    SwtButtonModule,
    NgOtpInputModule,
    SharedModule
  ],
  exports: [VerifyBoxComponent]
})
export class VerifyBoxModule { }
