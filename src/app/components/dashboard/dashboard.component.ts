import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { CookieKey } from 'src/app/shared/constants/cookie.key';
import { CookieHelper } from 'src/app/shared/helpers/cookie.hepler';
import { Message } from 'src/app/shared/models/message/message';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent {

  constructor(
    baseService: BaseService,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initData(): void {
    super.initData();
  }
}
