import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Routing } from '../../constants/common.constant';
import { Message } from '../../models/message/message';
import { SwtButton } from '../swt-button/swt-button.component';
import { MessageBox } from '../message-box/message-box.component';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { LoginStatus } from 'src/app/authentication/shared/enums/login.enum';

@Component({
  selector: 'access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  back(e: any) {
    if (this.authenticationService.getLoginStatus() === LoginStatus.LoggedIn) {
      this.router.navigate([`/${Routing.DASHBOARD.path}`]);
    } else {
      this.router.navigate([`/${Routing.LOGIN.path}`]);
    }
  }
}
