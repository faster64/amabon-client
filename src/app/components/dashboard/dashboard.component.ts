import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { CookieKey } from 'src/app/shared/constants/cookie.key';
import { CookieHelper } from 'src/app/shared/helpers/cookie.hepler';
import { ColumnGrid } from 'src/app/shared/models/base/column-grid.model';
import { Message } from 'src/app/shared/models/message/message';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { Utility } from 'src/app/shared/utils/utility';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  extends BaseComponent {

  Utility = Utility;

  displayColumn: ColumnGrid[] = [];

  isLoadingMonth = true;

  constructor(
    baseService: BaseService,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    this.initColumn();
  }

  initColumn() {
    for (let i = 0; i < 8; i++) {
      const column = new ColumnGrid();
      if(i < 2) {
        column.width = Math.floor(Math.random() * (260 - 80 + 1) + 180);
      } else {
        column.width = Math.floor(Math.random() * (360 - 80 + 1) + 180);
      }

      this.displayColumn.push(column);
    }
  }
}
