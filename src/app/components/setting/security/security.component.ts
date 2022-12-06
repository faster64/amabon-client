import { Component, EventEmitter, Output } from '@angular/core';
import { LoginLog } from 'src/app/authentication/shared/models/login-log-model';
import { MFA } from 'src/app/authentication/shared/models/mfa-model';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MfaType } from 'src/app/shared/enumerations/common.enum';
import { ColumnGrid } from 'src/app/shared/models/base/column-grid.model';
import { BaseService } from 'src/app/shared/services/base/base.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent extends BaseComponent {

  mfaOptions: any = [];

  mfa = new MFA();

  logs: LoginLog[] = [];

  isLoadingMfa = true;

  isLoadingLoginLog = true;

  displayColumn: ColumnGrid[] = [];

  @Output("loaded") loaded = new EventEmitter<boolean>();

  constructor(
    baseService: BaseService,
    public authenticationService: AuthenticationService,
  ) {
    super(baseService);
  }


  initData(): void {
    this.getCurrentMFASetting();
    this.getLoginHistory();
    this.initMfaOptions();
    this.initDisplayColumn();
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

  getLoginHistory() {
    this.authenticationService.getLoginHistory(this.paginationRequest).subscribe(
      response => {
        this.isLoadingLoginLog = false;
        if (response.success) {
          this.logs = [];
          this.logs = response.data.map((item: any) => JSON.parse(item.json));
          this.logs = this.logs.map((log: LoginLog) => {
            return Object.assign(log, { ...log.IpInformation, Address:  log.IpInformation.City + ' - ' + log.IpInformation.Country});
          });
        }
      },
      () => this.isLoadingLoginLog = false
    );
  }

  initMfaOptions() {
    this.mfaOptions = [];
    this.mfaOptions.push({ value: MfaType.Email, text: 'Email' })
  }

  initDisplayColumn() {
    this.displayColumn.push({ displayText: "Thời gian", column: "Time", width: 160, sortable: false });
    this.displayColumn.push({ displayText: "Thiết bị", column: "Device", width: 140, sortable: false });
    this.displayColumn.push({ displayText: "Địa chỉ", column: "Address", width: 190, sortable: false });
    this.displayColumn.push({ displayText: "Trình duyệt", column: "Browser", width: 180, sortable: false });
    this.displayColumn.push({ displayText: "Hệ điều hành", column: "OS", width: 140, sortable: false });
    this.displayColumn.push({ displayText: "IP", column: "IP", width: 120, sortable: false });
  }
}
