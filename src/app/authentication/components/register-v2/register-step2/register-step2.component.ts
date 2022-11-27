import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { CommonConstant, ErrorMessageConstant } from 'src/app/shared/constants/common.constant';
import { Message } from 'src/app/shared/models/message/message';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { BaseRegisterStepComponent } from '../base-step/base-register-step.component';

@Component({
  selector: 'app-register-step2',
  templateUrl: './register-step2.component.html',
  styleUrls: ['./register-step2.component.scss']
})
export class RegisterStep2Component extends BaseRegisterStepComponent {

  constructor(
    baseService: BaseService,
    activatedRoute: ActivatedRoute,
    router: Router,
    authenticationService: AuthenticationService,
  ) {
    super(baseService, activatedRoute, router, authenticationService);
  }

  resendOTP(e: any) {
    e.preventDefault();
    this.authenticationService.resendRegisterOtp(this.refId).subscribe(response => {
      if (response.success) {
        MessageBox.information(new Message(null, { content: 'Gửi lại OTP thành công!' }));
      }
      else {
        MessageBox.information(new Message(null, { content: response.message }));
      }
    },
      error => MessageBox.information(new Message(null, { content: ErrorMessageConstant.HAS_ERROR_MESSAGE }))
    )
  }
}
