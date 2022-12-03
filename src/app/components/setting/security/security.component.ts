import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MFA } from 'src/app/authentication/shared/models/mfa-model';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { ErrorMessageConstant } from 'src/app/shared/constants/common.constant';
import { MfaType } from 'src/app/shared/enumerations/common.enum';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { BaseService } from 'src/app/shared/services/base/base.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent extends BaseComponent {

  mfaOptions: any = [];

  mfa = new MFA();

  isLoadingMfa = true;

  @Output("loaded") loaded = new EventEmitter<boolean>();

  constructor(
    baseService: BaseService,
    public authenticationService: AuthenticationService,
  ) {
    super(baseService);
  }


  initData(): void {
    this.getCurrentMFASetting();
    this.initMfaOptions();
  }

  getCurrentMFASetting() {
    this.isLoadingMfa = true;
    this.authenticationService.getMfaSetting().subscribe(response => {
      this.isLoadingMfa = false;
      this.loaded.emit(true);
      if (response.success && response.data) {
        this.mfa = response.data;
      }
    })
  }

  initMfaOptions() {
    this.mfaOptions = [];
    this.mfaOptions.push({ value: MfaType.Email, text: 'Email' })
  }
}
