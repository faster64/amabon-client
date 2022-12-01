import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { HttpService } from 'src/app/shared/services/base/http.service';
import { TransferDataService } from 'src/app/shared/services/transfer/transfer-data.service';
import { environment } from 'src/environments/environment';
import { BaseMessageResponse } from '../../../shared/models/base/base-message-response';
import { SessionStorageKey } from 'src/app/shared/constants/sessionstorage.key';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { AuthenticationResponse } from '../models/responses/authentication-response';
import { RefreshTokenModel } from '../models/requests/refresh-token-model';
import { UserCred } from '../models/requests/user-cred';
import { VerifyModel } from '../models/requests/verify-model';
import { VerifyOtpResult } from '../models/responses/verify-otp-result';
import { LoginStatus } from '../enums/login.enum';
import { ServiceResult } from 'src/app/shared/models/base/service-result';
import { Utility } from 'src/app/shared/utils/utility';
import { CookieHelper } from 'src/app/shared/helpers/cookie.hepler';
import { CookieKey } from 'src/app/shared/constants/cookie.key';
import { User } from '../models/user-model';
import { CreateAccountRequest } from '../../components/register-v2/base-step/base-register-step.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * auth api url
   */
  private auth_api_url = `${environment.api_url}/aus`;

  public cookieExprie = 7;

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
  ]

  /**
   * Thời gian ping check live token
   */
  get PING_TIME() {
    return 300000;
  };

  /**
   * True nếu đang refresh token, otherwise false
   */
  public isRefreshing = false;

  constructor(
    private _httpService: HttpService,
    private _transfer: TransferDataService
  ) { }

  public getUserId() {
    return CookieHelper.getCookie(`${environment.team}_${CookieKey.USER_ID}`) || "";
  }

  public getAccessToken() {
    return CookieHelper.getCookie(`${environment.team}_${CookieKey.ACCESS_TOKEN}`) || "";
  }

  public getRefreshToken() {
    return CookieHelper.getCookie(`${environment.team}_${CookieKey.REFRESH_TOKEN}`) || "";
  }

  /**
   * Lưu user config
   */
  saveAccessTokenConfig(accessToken: string) {
    const config = StringHelper.parseJwt(accessToken);
    const keys = Object.keys(config);

    CookieHelper.setCookie(`${environment.team}_${CookieKey.ACCESS_TOKEN}`, accessToken, this.cookieExprie);
    keys.forEach(key => {
      let snakeCaseKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      if (!snakeCaseKey.startsWith('_')) {
        snakeCaseKey = `_${snakeCaseKey}`;
      }
      CookieHelper.setCookie(`${environment.team}${snakeCaseKey}`, config[key], this.cookieExprie);
    });
  }

  /**
   * Lưu config
   */
  saveAuthConfig(config: AuthenticationResponse) {
    this.saveAccessTokenConfig(config.accessToken);
    CookieHelper.setCookie(`${environment.team}_${CookieKey.REFRESH_TOKEN}`, config.refreshToken, this.cookieExprie);
  }

  /**
   * Trả về login status
   */
  getLoginStatus(): LoginStatus {
    const loggedIn = CookieHelper.getCookie(`${environment.team}_${CookieKey.LOGGED_IN}`);
    if (loggedIn === '1') {
      return LoginStatus.LoggedIn;

    } else if (loggedIn === '0') {
      return LoginStatus.UnLoggedIn;
    }
    return LoginStatus.Unknown;
  }

  /**
   * Refresh token
   */
  refreshToken(refresh: RefreshTokenModel) {
    const url = `${this.auth_api_url}/authentication/refresh-token`;
    return this._httpService.post<AuthenticationResponse>(url, refresh);
  }

  /**
   * ping check live token
   */
  ping() {
    const url = `${this.auth_api_url}/authentication/ping?uid=${this.getUserId()}`;
    return this._httpService.get<string>(url);
  }

  /**
   * Đăng ký
   */
  register(userInfo: any) {
    const url = `${this.auth_api_url}/authentication/create-account`;
    return this._httpService.post<AuthenticationResponse>(url, userInfo);
  }

  getCurrentInfo(refId: string) {
    const url = `${this.auth_api_url}/authentication/reg/get-current-info?refId=${refId}`;
    return this._httpService.get<ServiceResult>(url);
  }

  resendRegisterOtp(refId: string) {
    const url = `${this.auth_api_url}/authentication/register-otp?refId=${refId}`;
    return this._httpService.get<ServiceResult>(url);
  }

  /**
   * Đăng nhập
   */
  login(userCred: UserCred) {
    const url = `${this.auth_api_url}/authentication/login`;
    return this._httpService.post<AuthenticationResponse>(url, userCred);
  }

  /**
   * Đăng xuất
   */
  logout(callback?: Function) {
    const url = `${this.auth_api_url}/authentication/logout?uid=${this.getUserId()}`;

    this._httpService.get<AuthenticationResponse>(url).subscribe(
      response => {
        this.clearListLocal.forEach(item => CookieHelper.removeCookie(`${environment.team}_${item}`));
        this.clearListSession.forEach(item => sessionStorage.removeItem(`${environment.team}_${item}`));

        CookieHelper.setCookie(`${environment.team}_${CookieKey.LOGGED_IN}`, "0", this.cookieExprie);
        if (callback) {
          callback(response);
        }
      },
      err => {
        CookieHelper.setCookie(`${environment.team}_${CookieKey.LOGGED_IN}`, "0", this.cookieExprie);
        if (callback) {
          callback(err);
        }
      }
    );
  }

  /**
   * Gửi mã OTP
   */
  sendOtpAsync(verifyModel: VerifyModel, endpoint: string) {
    const url = `${this.auth_api_url}/authentication/${endpoint}`;
    return this._httpService.post<VerifyOtpResult>(url, verifyModel);
  }

  /**
   * Cấp mã OTP mới
   * u: UserName
   */
  sendNewOtp(u: string, type: number) {
    const url = `${this.auth_api_url}/authentication/provide-new-otp?u=${btoa(u)}&type=${type}`;
    return this._httpService.get<BaseMessageResponse>(url);
  }

  /**
   * verify with secret key
   */
  verifySecretKey(secretKey: string) {
    const url = `${this.auth_api_url}/authentication/verify-secret-key?secretKey=${btoa(secretKey)}`;
    return this._httpService.get<ServiceResult>(url);
  }
}
