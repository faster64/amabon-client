import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { ErrorMessageConstant, Routing } from 'src/app/shared/constants/common.constant';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { ObjectHelper } from 'src/app/shared/helpers/object.helper';
import { AuthenticationService } from '../../services/authentication.service';
import { VerifyModel } from '../../models/requests/verify-model';



@Component({
  selector: 'verify-form',
  templateUrl: './verify-form.component.html',
  styleUrls: ['./verify-form.component.scss']
})
export class VerifyFormComponent implements OnInit {

  @Input()
  endpoint = "";

  @Input()
  verifyText = "XÁC THỰC";

  @Input()
  verifyingText = "ĐANG XÁC THỰC";

  @Output()
  onSuccess = new EventEmitter();

  @Output()
  onFailed = new EventEmitter();

  @Output()
  onResend = new EventEmitter();

  userMail = "";

  timer: any;

  constructor(
    public authenticationService: AuthenticationService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getEmail();
  }

  getEmail() {
    try {
      const mailEncode = this.activatedRoute.snapshot.params.mailEncode;
      if (mailEncode.isNullOrEmpty()) {
        this.executeOnNotAllowAccess();
        return;
      }

      const mailDecode = atob(mailEncode);
      if (mailDecode.isMail() === false) {
        this.executeOnNotAllowAccess();
        return;
      }

      this.userMail = mailDecode;
    } catch (error) {
      this.executeOnNotAllowAccess();
    }
  }

  /**
   * Về home
   */
  backToHome() {
    this.router.navigate([Routing.DASHBOARD.path]);
  }

  /**
   * Nếu không đc phép vào page này
   */
  executeOnNotAllowAccess() {
    this.router.navigateByUrl(`/${Routing.NOT_FOUND.path}`);
  }

  /**
   * Verify
   */
  verify(message: Message) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {

      const verifyModel = new VerifyModel();
      verifyModel.userName = this.userMail;
      verifyModel.otp = message.data;

      this.authenticationService.sendOtpAsync(verifyModel, this.endpoint).subscribe(
        response => {
          if (response.code == HttpStatusCode.Ok) {
            this.onSuccess.emit(response);
          } else {
            this.onFailed.emit(response);
          }

          if (message.callback) {
            message.callback(response);
          }
        },
        error => {
          if (message.callback) {
            message.callback(error);
          }
        }
      );
    }, 10)
  }

  /**
   * Gửi lại OTP
   */
  resend(message: Message) {
    this.onResend.emit(message);
  }
}
