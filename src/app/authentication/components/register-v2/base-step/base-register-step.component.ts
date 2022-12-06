import { Component, Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterStep } from 'src/app/authentication/shared/enums/register-step.enum';
import { User } from 'src/app/authentication/shared/models/user-model';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { Routing } from 'src/app/shared/constants/common.constant';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { Message } from 'src/app/shared/models/message/message';
import { BaseService } from 'src/app/shared/services/base/base.service';

@Directive()
export class BaseRegisterStepComponent extends BaseComponent {

  @Input() currentInfo = new CreateAccountRequest();

  @Input() currentStep = RegisterStep.RequiredInformation;

  @Output("currentInfoChange") currentInfoChangeEvent = new EventEmitter();

  @Output("next") nextEvent = new EventEmitter();

  refId = "";

  constructor(
    baseService: BaseService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public authenticationService: AuthenticationService,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initData(): void {
    if (this.currentStep > 1) {
      this.checkRefId();
      this.getCurrentInfo();
    }
  }

  checkRefId() {
    this.refId = this.activatedRoute.snapshot.queryParams["refId"];
    if (StringHelper.isNullOrEmpty(this.refId) || this.refId.length !== 36) {
      this.router.navigate([`/${Routing.REGISTER.path}/step1`]);
    }
  }

  getCurrentInfo() {
    this.currentInfo = new CreateAccountRequest();
    this.isLoading = true;

    this.authenticationService.getCurrentInfo(this.refId).subscribe(response => {
      this.isLoading = false;
      if (response.success) {
        this.currentInfo = JSON.parse(response.data["currentInfo"]);
        this.currentInfo.refId = this.refId;
        this.currentInfoChangeEvent.emit(this.currentInfo);

        if (response.data["currentStep"] == RegisterStep.Completed) {
          this.router.navigate([`/${Routing.REGISTER.path}/completed`]);
          return;
        }

        if (response.data["currentStep"] == RegisterStep.VerifiedWithoutPassword) {
          MessageBox.information(new Message(null, { content: 'Có vẻ như bạn đã tạo tài khoản với địa chỉ email này trước đây nhưng chưa tạo mật khẩu. Chúng tôi đã gửi một mật khẩu mặc định về địa chỉ email của bạn. Kiểm tra thư và sử dụng mật khẩu mặc định để đăng nhập.' })).subscribe(() => {
            this.router.navigate([`/${Routing.LOGIN.path}`]);
          });
          return;
        }

        if (this.currentStep !== response.data["currentStep"]) {
          this.currentStep = response.data["currentStep"];
          this.router.navigateByUrl(`/${Routing.REGISTER.path}/step${this.currentStep}?refId=${this.refId}`);
        }
      } else {
        MessageBox.information(new Message(null, { content: response.message }));
      }
    });
  }

  emitNext() {
    this.nextEvent.emit();
  }
}


export class CreateAccountRequest extends User {
  public refId = "";

  public otp = "";

  public confirmPassword = "";
}
