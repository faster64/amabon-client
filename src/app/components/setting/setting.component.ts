import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { ErrorMessageConstant, SettingOption } from 'src/app/shared/constants/common.constant';
import { MfaType } from 'src/app/shared/enumerations/common.enum';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { Utility } from 'src/app/shared/utils/utility';
import { SecurityComponent } from './security/security.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent extends BaseComponent {

  SettingOption = SettingOption;

  optionUrl = "";

  optionValues: any = [];

  loaded = false;

  @ViewChild("saveBtn")
  saveBtn!: SwtButton;

  @ViewChild("security")
  security!: SecurityComponent;

  constructor(
    baseService: BaseService,
    public activatedRoute: ActivatedRoute,
    public authenticationService: AuthenticationService,
    public router: Router,
  ) {
    super(baseService);
  }

  initData(): void {
    this.initOptionValues();
    this.getOptionValue();
  }

  initOptionValues() {
    this.optionValues = [];
    this.optionValues.push({ path: SettingOption.COMMON, text: 'Chung' })
    this.optionValues.push({ path: SettingOption.SECURITY, text: 'Bảo mật và đăng nhập' })
    this.optionValues.push({ path: SettingOption.PRIVACY, text: 'Quyền riêng tư' })
  }

  getOptionValue() {
    this.optionUrl = this.activatedRoute.snapshot.data["option"];
  }

  redirect(path: string) {
    if (path !== SettingOption.SECURITY) {
      Utility.featureIsDeveloping(null);
      return;
    }
    this.router.navigateByUrl(`/${this.Routing.SETTING.path}/${path}`);
  }

  saveChanges() {
    console.log(this.security.mfa);

    const mfa = this.security.mfa;
    if (mfa.enabled && mfa.type === MfaType.None) {
      mfa.type = MfaType.Email;
    }

    this.authenticationService.setMfa(mfa).subscribe(
      response => {
        this.saveBtn.isFinished = true;
        if (response.success) {
          SnackBar.openSnackBarSuccess(new SnackBarParameter(this, "Cập nhật thành công", '', 1500));
        } else {
          SnackBar.openSnackBarDanger(new SnackBarParameter(this, ErrorMessageConstant.HAS_ERROR_MESSAGE, '', 1500));
        }
      },
      () => {
        this.saveBtn.isFinished = true;
        SnackBar.openSnackBarDanger(new SnackBarParameter(this, ErrorMessageConstant.HAS_ERROR_MESSAGE, '', 1500))
      }
    )
  }
}
