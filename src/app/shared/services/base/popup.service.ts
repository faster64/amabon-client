import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateAvatarPopupComponent } from 'src/app/components/user/popups/update-avatar-popup/update-avatar-popup.component';
import { environment } from 'src/environments/environment';
import { BreakPoint } from '../../constants/break-point.constant';
import { CookieKey } from '../../constants/cookie.key';
import { CookieHelper } from '../../helpers/cookie.hepler';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  config!: MatDialogConfig;

  constructor(
    public dialog: MatDialog
  ) {

  }

  getBaseConfig() {
    this.config = new MatDialogConfig();
    const position: DialogPosition = {};
    position.top = '50px';

    const currentScreenWidth = window.innerWidth;
    let configWidth = '80%';
    let configHeight = '120px';
    const maxWidth = '80%';
    const maxHeight = '280px';

    if (currentScreenWidth < BreakPoint.SM) {
      configWidth = '80%';
      configHeight = '100px';
    } else if (currentScreenWidth >= BreakPoint.SM && currentScreenWidth < BreakPoint.MD) {
      configWidth = '480px';
    } else {
      configWidth = '440px';
    }

    // this._config.minWidth = '440px';
    this.config.minWidth = configWidth;
    this.config.maxWidth = maxWidth;
    this.config.minHeight = configHeight;
    this.config.maxHeight = maxHeight;
    this.config.position = position;

    return this.config;
  }
}
