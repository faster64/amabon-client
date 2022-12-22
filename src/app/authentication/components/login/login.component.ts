import { query } from '@angular/animations';
import { HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { ErrorMessageConstant, Routing } from 'src/app/shared/constants/common.constant';
import { CookieKey } from 'src/app/shared/constants/cookie.key';
import { HttpStatusCodeExtension } from 'src/app/shared/enumerations/http-status-code-extension.enum';
import { CookieHelper } from 'src/app/shared/helpers/cookie.hepler';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { SettingService } from 'src/app/shared/services/base/setting.service';
import { TransferDataService } from 'src/app/shared/services/transfer/transfer-data.service';
import { Utility } from 'src/app/shared/utils/utility';
import { environment } from 'src/environments/environment';
import { LoginStatus } from '../../shared/enums/login.enum';
import { RegisterStep } from '../../shared/enums/register-step.enum';
import { UserCred } from '../../shared/models/requests/user-cred';
import { AuthenticationResponse } from '../../shared/models/responses/authentication-response';
import { AuthenticationService } from '../../shared/services/authentication.service';

declare var google: any;

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements AfterViewInit {

  Utility = Utility;

  registerUrl = Routing.REGISTER.path;

  userCred = new UserCred();

  @ViewChild("email") emailInput!: ElementRef;

  @ViewChild("password") passwordInput!: ElementRef;

  @ViewChild("loginBtn") loginBtn!: SwtButton;

  @ViewChild("googleBtn") googleBtn!: ElementRef;

  constructor(
    baseService: BaseService,
    private transfer: TransferDataService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private settingService: SettingService,
    // private socialAuthService: SocialAuthService
  ) {
    super(baseService);
  }

  initData(): void {
    this.setBackground();
  }

  ngAfterViewInit(): void {
    this.initForm();
    this.cdr.detectChanges();
    // google.accounts.id.initialize({
    //   client_id: "483405168173-ng58air6q83sgnmeo80sc6g0gsm2nmpf.apps.googleusercontent.com",
    //   callback: (response: any) => this.handleGoogleSignIn(response)
    // });
    // google.accounts.id.renderButton(
    //   document.getElementById("googleBtn"),
    //   {
    //     theme: 'outline',
    //     size: 'large',
    //     width: this.googleBtn.nativeElement.offsetWidth,
    //     text: 'Đăng nhập với Google',
    // }  // customization attributes
    // );
  }

  handleGoogleSignIn(response: any) {
    // gapi.load('auth2', function() {
    //   gapi.auth2.init({'client_id': '483405168173-ng58air6q83sgnmeo80sc6g0gsm2nmpf.apps.googleusercontent.com'});
    // });
    // console.log("credential", response.credential);

    // // This next is for decoding the idToken to an object if you want to see the details.
    // let base64Url = response.credential.split('.')[1];
    // let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    //   return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    // }).join(''));
    // console.log(JSON.parse(jsonPayload));
  }

  logout() {
    gapi.auth2.getAuthInstance().signOut();
  }

  /**
   * khởi tạo form
   */
  initForm() {
    if (!environment.production) {
      this.userCred.userName = "admin12";
      this.userCred.password = "admin12@@";
    }
    this.emailInput.nativeElement.focus();
  }

  /**
   * Thực thi khi có lỗi trong lúc validate
   */
  executeOnError(field: string, message: string): boolean {
    const snackBarParameter = new SnackBarParameter();
    snackBarParameter.duration = SnackBar.forever;
    snackBarParameter.message = message;
    snackBarParameter.afterDismissedCallback = () => this.focusOnFieldError(field);
    SnackBar.openSnackBarDanger(snackBarParameter);

    this.focusOnFieldError(field);
    return false;
  }

  public setBackground() {
    const start = 1;
    const end = 6;
    const val = Math.floor(Math.random() * (end - start + 1) + start);
    const loginElement = document.getElementById("login");
    (loginElement as any).style.backgroundImage = `url(../../../../assets/img/bg${val}.jpg)`;
  }

  /**
   * focus vào field lỗi
   */
  private focusOnFieldError(field: string) {
    if (field.isNullOrEmpty() === false) {
      (this as any)[`${field}Input`].nativeElement.focus();
    }
  }

  /**
   * Validate trước khi tiến hành đăng nhập
   */
  validateBeforeLogin(): boolean {
    if (this.userCred.userName.isNullOrEmpty()) {
      return this.executeOnError("email", "Tài khoản không được để trống");

    } else if (this.userCred.password.isNullOrEmpty()) {
      return this.executeOnError("password", "Mật khẩu không được để trống");
    }

    return true;
  }

  /**
   * Đăng nhập
   */
  login(e: any) {
    if (!this.validateBeforeLogin()) {
      this.loginBtn.isFinished = true;
      return;
    }
    SnackBar.dismiss();

    const cred = new UserCred();
    cred.userName = btoa(this.userCred.userName);
    cred.password = btoa(this.userCred.password);
    this.authenticationService.login(cred).subscribe(
      response => {
        this.loginBtn.isFinished = true;
        if (response.code == HttpStatusCode.Ok) {
          this.handleLoggedIn(response);
        }
        // Nếu tài khoản chưa đc xác minh
        else if (response.code == HttpStatusCodeExtension.NotVerified) {
          const message = new Message(this, {
            title: 'Thông báo',
            content: ErrorMessageConstant.ACCOUNT_NOT_VERIFIED,
            confirmText: 'Xác minh ngay',
          });
          message.callback = () => {
            this.router.navigateByUrl(`/${Routing.VERIFY_REGISTER.path}/${cred.userName}`);
          }

          MessageBox.confirm(message);
        }
        else {
          SnackBar.openSnackBarDanger(new SnackBarParameter(null, response.message));
        }
      },
      () => {
        this.loginBtn.isFinished = true;
      }
    );
  }

  /**
   * Đăng nhập khi ấn enter
   */
  loginByEnter(e: any) {
    if (e.key === "Enter") {
      this.loginBtn.clickExecute(e);
    }
  }

  handleLoggedIn(response: AuthenticationResponse) {
    if(response.step && response.step.currentStep !== RegisterStep.RequiredInformation) {
      MessageBox.information(new Message(this, {content: 'Tài khoản của bạn cần bổ sung thêm thông tin. Bổ sung ngay?'})).subscribe( () => {
        this.router.navigate([`${Routing.REGISTER.path}/step${response.step.currentStep}`], {queryParams: {refId: response.step.refId}});
      })
    }
    else if(response.requiredMFA) {
      this.router.navigateByUrl(`/${Routing.VERIFY_LOGIN.path}?u=${btoa(this.userCred.userName)}&e=${btoa(response.message)}`);
    }
    else {
      this.authenticationService.saveAuthConfig(response);
      CookieHelper.setCookie(`${environment.team}_${CookieKey.LOGGED_IN}`, '1', this.authenticationService.cookieExprie);
      this.transfer.initHeader.emit();
      this.router.navigateByUrl(`/${Routing.SALARY_CONVERTER.path}`);
    }
  }

  loginWithGoogle(): void {
    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
