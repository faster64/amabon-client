import { Component, OnInit } from '@angular/core';
import { LoginStatus } from 'src/app/authentication/shared/enums/login.enum';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { Message } from '../../models/message/message';
import { TransferDataService } from '../../services/transfer/transfer-data.service';
import { MessageBox } from '../message-box/message-box.component';
import { SwtButton } from '../swt-button/swt-button.component';

@Component({
  selector: 'tiktok-button',
  templateUrl: './tiktok-button.component.html',
  styleUrls: ['./tiktok-button.component.scss']
})
export class TiktokButton extends SwtButton {

  constructor(
    transferDataSV: TransferDataService,
    public authenticationService: AuthenticationService
  ) {
    super(transferDataSV);
  }

  /**
   * Override Execute when click button
   */
  clickExecute(e: any) {
    if (!this.isFinished)
      return;

    const loginStatus = this.authenticationService.getLoginStatus();
    if (loginStatus === LoginStatus.Unknown || loginStatus === LoginStatus.UnLoggedIn) {
      MessageBox.information(new Message(this, { content: "Login require" }));
      this.isFinished = true;
      return;
    }

    const hasPermission = this.checkPermission();
    if (hasPermission) {
      this.isFinished = false;
      this.onClick.emit(e);
    } else {
      this.notPermissionNotify();
    }
  }
}
