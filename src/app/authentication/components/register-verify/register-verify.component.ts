import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { Routing } from 'src/app/shared/constants/common.constant';
import { OtpType } from 'src/app/shared/enumerations/common.enum';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { VerifyFormComponent } from '../../shared/components/verify-form/verify-form.component';
import { VerifyOtpResult } from '../../shared/models/responses/verify-otp-result';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-register-verify',
  templateUrl: './register-verify.component.html',
  styleUrls: ['./register-verify.component.scss']
})
export class RegisterVerifyComponent extends VerifyFormComponent {

  endpoint = "verify-account";

  message = new Message(this, null);

  constructor(
    authenticationService: AuthenticationService,
    activatedRoute: ActivatedRoute,
    router: Router
  ) {
    super(authenticationService, activatedRoute, router);
  }

  verifySuccess(response: VerifyOtpResult | Event) {
    const message = new Message(this, {
      title: 'Thông báo',
      content: "Chúc mừng, tài khoản của bạn đã được thành công. Bạn có muốn đăng nhập?",
      confirmText: 'OK',
    });
    message.callback = () => {
      this.router.navigateByUrl(`/${Routing.LOGIN}`);
    }

    MessageBox.confirm(message);
  }

  verifyFailed(response: VerifyOtpResult | Event) {
    SnackBar.openSnackBarDanger(new SnackBarParameter(this, (response as VerifyOtpResult).message));
  }

  /**
   * Gửi lại OTP xác minh tài khoản
   */
  resend(message: Message) {
    this.authenticationService.sendNewOtp(this.userMail, OtpType.Verify).subscribe(response => {
      if (response.success) {
        SnackBar.openSnackBarSuccess(new SnackBarParameter(null, response.message, "", SnackBar.forever));
      }
      else {
        SnackBar.openSnackBarDanger(new SnackBarParameter(null, response.message, "", SnackBar.forever));
        message.callback();
      }
    })
  }
}
