import { HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { Routing } from 'src/app/shared/constants/common.constant';
import { ErrorCode } from 'src/app/shared/enumerations/error-code.enum';
import { ObjectHelper } from 'src/app/shared/helpers/object.helper';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { TransferDataService } from 'src/app/shared/services/transfer/transfer-data.service';
import { environment } from 'src/environments/environment';
import { LoginStatus } from '../../shared/enums/login.enum';
import { User } from '../../shared/models/user-model';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  user = new UserRegister();

  acceptPolicy = false;

  defaultGender = "0";

  @ViewChild("registerBtn")
  registerBtn!: SwtButton;

  @ViewChild("email") emailInput!: ElementRef;
  @ViewChild("password") passwordInput!: ElementRef;
  @ViewChild("confirmPassword") confirmPasswordInput!: ElementRef;
  @ViewChild("firstName") firstNameInput!: ElementRef;
  @ViewChild("lastName") lastNameInput!: ElementRef;
  @ViewChild("address") addressInput!: ElementRef;

  constructor(
    private transferDataSV: TransferDataService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.setBackground();
    this.checkLoggedIn();
  }

  ngAfterViewInit(): void {
    this.initForm();
    this.cdr.detectChanges();
  }

  /**
   * khởi tạo form
   */
  initForm() {
    if(!environment.production) {
      this.user.email = "cuongnguyen.ftdev@gmail.com";
      this.user.password = "admin12@@";
      this.user.confirmPassword = "admin12@@";
      this.user.firstName = "Nguyễn Văn";
      this.user.lastName = "Cương";
      this.user.address = "154 Đình Thôn, Mỹ Đình, Hà Nội"
      this.acceptPolicy = true;
    }
    this.emailInput.nativeElement.focus();
  }

  setBackground() {
    const start = 1;
    const end = 6;
    const val = Math.floor(Math.random() * (end - start + 1) + start);
    const registerElement = document.querySelector(".register");
    (registerElement as any).style.backgroundImage = `url(../../../../assets/img/bg${val}.jpg)`;
  }

  /**
   * Nếu đã logged in thì đẩy vào dashboard
   */
  checkLoggedIn() {
    if (this.authenticationService.getLoginStatus() === LoginStatus.LoggedIn) {
      this.router.navigate([Routing.DASHBOARD.path]);
    }
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

  /**
   * focus vào field lỗi
   */
  private focusOnFieldError(field: string) {
    if (field.isNullOrEmpty() === false) {
      (this as any)[`${field}Input`].nativeElement.focus();
    }
  }

  /**
   * Validate thông tin
   */
  validateInfo(): boolean {
    if (this.user.email.isNullOrEmpty()) {
      return this.executeOnError("email", "Email không được để trống");

    } else if (this.user.email.isMail() === false) {
      return this.executeOnError("email", "Email không đúng định dạng");

    } else if (this.user.password.isNullOrEmpty()) {
      return this.executeOnError("password", "Mật khẩu không được để trống");

    } else if (this.user.confirmPassword.isNullOrEmpty()) {
      return this.executeOnError("confirmPassword", "Xác nhận mật khẩu không được để trống");

    } else if (this.user.password !== this.user.confirmPassword) {
      return this.executeOnError("password", "Mật khẩu và mật khẩu xác nhận phải giống nhau");

    } else if (this.user.firstName.isNullOrEmpty()) {
      return this.executeOnError("firstName", "Họ không được để trống");

    } else if (this.user.lastName.isNullOrEmpty()) {
      return this.executeOnError("lastName", "Tên không được để trống");

    } else if (this.user.address.isNullOrEmpty()) {
      return this.executeOnError("address", "Địa chỉ không được để trống");

    } else if (!this.acceptPolicy) {
      return this.executeOnError("", "Bạn phải đồng ý với điều khoản");
    }

    return true;
  }

  updateGender(e: any) {
    this.user.gender = parseInt(e.value + "");
  }


  /**
   * Đăng ký
   */
  register(e: any) {
    if (!this.validateInfo()) {
      this.registerBtn.isFinished = true;
      return;
    }

    SnackBar.dismiss();

    this.authenticationService.register(this.user).subscribe(response => {
      this.registerBtn.isFinished = true;
      if (response.code === HttpStatusCode.Ok) {
        const mail = ObjectHelper.clone(this.user.email);
        this.user = ObjectHelper.clearValue(this.user);

        const snackBarParameter = new SnackBarParameter();
        snackBarParameter.actionText = "OK";
        snackBarParameter.message = "Đăng ký tài khoản thành công. Kiểm tra mail để xác thực tài khoản. Xin cảm ơn!";
        snackBarParameter.duration = SnackBar.forever;
        snackBarParameter.afterDismissedCallback = () => {
          this.router.navigateByUrl(`/${Routing.VERIFY_REGISTER.path}/${btoa(mail)}`)
        }
        SnackBar.openSnackBarSuccess(snackBarParameter);
      } else {
        if (response.validateInfo && response.validateInfo.length) {
          const firstError = response.validateInfo[0];
          const snackBarParameter = new SnackBarParameter();
          if (firstError.fieldName.toLocaleLowerCase() === "email" && firstError.code == ErrorCode.Duplicate) {
            snackBarParameter.message = "Email đã tồn tại. Vui lòng sử dụng email khác!";
            this.focusOnFieldError("email");
          } else {
            snackBarParameter.message = firstError.errorMessage;
          }

          SnackBar.openSnackBarDanger(snackBarParameter);
        } else {
          SnackBar.openSnackBarDanger(new SnackBarParameter(null, response.message));
        }
      }
    },
      error => this.registerBtn.isFinished = true
    );

  }
}

class UserRegister extends User {
  public confirmPassword: string = "";
}
