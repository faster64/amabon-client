import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateAvatarPopupComponent } from 'src/app/components/user/popups/update-avatar-popup/update-avatar-popup.component';
import { environment } from 'src/environments/environment';
import { CookieKey } from '../../constants/cookie.key';
import { CookieHelper } from '../../helpers/cookie.hepler';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';
import { PopupService } from '../base/popup.service';

@Injectable({
  providedIn: 'root'
})
export class AvatarService extends BaseService {

  constructor(
    http: HttpService,
    public dialog: MatDialog,
    public popupService: PopupService,
  ) {
    super(http);
    this.serviceName = "ums";
    this.controller = "avatar";
  }

  getAvatarUrl() {
    const url = `${this.getApiUrl()}/${this.serviceName}/${this.controller}/get-avatar`;
    return this.takeOriginHttpClient().get<ServiceResult>(url);
  }

  updateAvatar(formData: FormData) {
    const url = `${this.getApiUrl()}/${this.serviceName}/${this.controller}/get-avatar`;
    return this.takeOriginHttpClient().get<ServiceResult>(url);
  }

  openUpdateAvatarPopup(config?: MatDialogConfig<any>) {
    if(config == null) {
      config = this.popupService.getBaseConfig();
    }
    return this.dialog.open(UpdateAvatarPopupComponent, config);
  }
}
