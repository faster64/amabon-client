import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpBoxComponent } from './otp-box.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OtpBoxComponent],
  imports: [
    CommonModule,
    SwtButtonModule,
    NgOtpInputModule,
    SharedModule
  ],
  exports: [OtpBoxComponent]
})
export class OtpBoxModule { }
