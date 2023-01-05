import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routing } from 'src/app/shared/constants/common.constant';
import { CookieKey } from 'src/app/shared/constants/cookie.key';
import { SessionStorageKey } from 'src/app/shared/constants/sessionstorage.key';
import { CookieHelper } from 'src/app/shared/helpers/cookie.hepler';
import { environment } from 'src/environments/environment';
import { AuthenticationResponse } from '../../shared/models/responses/authentication-response';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  /**
   * List clear khi logout
   */
  private clearListLocal = [
    CookieKey.USER_ID,
    CookieKey.ACCESS_TOKEN,
    CookieKey.ROLE_NAME,
    CookieKey.REFRESH_TOKEN,
    CookieKey.FIRST_NAME,
    CookieKey.LAST_NAME,
    CookieKey.SETTING,
  ];

  private clearListSession = [
    SessionStorageKey.SIDEBAR_INDEX,
    SessionStorageKey.PASSED_SECURITY,
  ]

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.onLogout();
  }

  onLogout() {
    const url = `${this.authenticationService.auth_api_url}/authentication/logout?uid=${this.authenticationService.getUserId()}`;

    this.authenticationService._httpService.get<AuthenticationResponse>(url).subscribe(
      response => {
        this.clearListLocal.forEach(item => CookieHelper.removeCookie(`${environment.team}_${item}`));
        this.clearListSession.forEach(item => sessionStorage.removeItem(`${environment.team}_${item}`));

        CookieHelper.setCookie(`${environment.team}_${CookieKey.LOGGED_IN}`, "0", this.authenticationService.cookieExprie);
        if (this.authenticationService.logoutCallback) {
          this.authenticationService.logoutCallback(response);
        } else {
          this.router.navigate([`/${Routing.LOGIN.path}`]);
        }
      },
      err => {
        CookieHelper.setCookie(`${environment.team}_${CookieKey.LOGGED_IN}`, "0", this.authenticationService.cookieExprie);
        if (this.authenticationService.logoutCallback) {
          this.authenticationService.logoutCallback(err);
        }
        else {
          this.router.navigate([`/${Routing.LOGIN.path}`]);
        }
      }
    );
  }
}
