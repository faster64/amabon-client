import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageKey } from 'src/app/shared/constants/localstorage.key';
import { StringHelper } from 'src/app/shared/helpers/string-helper';
import { HttpService } from 'src/app/shared/services/base/http.service';
import { TransferDataService } from 'src/app/shared/services/transfer/transfer-data.service';
import { environment } from 'src/environments/environment';
import { BaseMessageResponse } from '../../../shared/models/base/base-message-response';
import { SessionStorageKey } from 'src/app/shared/constants/sessionstorage.key';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { AuthResult } from '../models/responses/auth-result';
import { RefreshTokenModel } from '../models/requests/refresh-token-model';
import { UserCred } from '../models/requests/user-cred';
import { VerifyModel } from '../models/requests/verify-model';
import { VerifyOtpResult } from '../models/responses/verify-otp-result';
import { LoginStatus } from '../enums/login.enum';
import { ServiceResult } from 'src/app/shared/models/base/service-result';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * auth api url
   */
  private auth_api_url = `${environment.api_url}/aus`;

  /**
   * List clear khi logout
   */
  private clearListLocal = [
    LocalStorageKey.USER_ID,
    LocalStorageKey.ACCESS_TOKEN,
    LocalStorageKey.ROLE_NAME,
    LocalStorageKey.REFRESH_TOKEN,
    LocalStorageKey.FIRST_NAME,
    LocalStorageKey.LAST_NAME,
    LocalStorageKey.SETTING,
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
    return localStorage.getItem(`${environment.team}_${LocalStorageKey.USER_ID}`) || "";
  }

  public getToken() {
    return localStorage.getItem(`${environment.team}_${LocalStorageKey.ACCESS_TOKEN}`) || "";
  }

  public getRefreshToken() {
    return localStorage.getItem(`${environment.team}_${LocalStorageKey.REFRESH_TOKEN}`) || "";
  }

  /**
   * Lưu user config
   */
  saveTokenConfig(accessToken: string) {
    const config = StringHelper.parseJwt(accessToken);
    const keys = Object.keys(config);

    localStorage.setItem(`${environment.team}_${LocalStorageKey.ACCESS_TOKEN}`, accessToken);
    keys.forEach(key => {
      let snakeCaseKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      if (!snakeCaseKey.startsWith('_')) {
        snakeCaseKey = `_${snakeCaseKey}`;
      }

      localStorage.setItem(`${environment.team}${snakeCaseKey}`, config[key]);
    });
  }

  /**
   * Lưu config
   */
  saveAuthConfig(config: AuthResult) {
    this.saveTokenConfig(config.accessToken);
    localStorage.setItem(`${environment.team}_${LocalStorageKey.REFRESH_TOKEN}`, config.refreshToken);
  }

  getLoginStatus(): LoginStatus {
    const loggedIn = localStorage.getItem(`${environment.team}_${LocalStorageKey.LOGGED_IN}`);
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
    return this._httpService.post<AuthResult>(url, refresh);
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
    const url = `${this.auth_api_url}/authentication/register`;
    return this._httpService.post<AuthResult>(url, userInfo);
  }

  /**
   * Đăng nhập
   */
  login(userCred: UserCred) {
    const url = `${this.auth_api_url}/authentication/login`;
    return this._httpService.post<AuthResult>(url, userCred);
  }

  /**
   * Đăng xuất
   */
  logout(callback?: Function) {
    const url = `${this.auth_api_url}/authentication/logout?uid=${this.getUserId()}`;

    this._httpService.get<AuthResult>(url).subscribe(
      response => {
        this.clearListLocal.forEach(item => localStorage.removeItem(`${environment.team}_${item}`));
        this.clearListSession.forEach(item => sessionStorage.removeItem(`${environment.team}_${item}`));

        localStorage.setItem(`${environment.team}_${LocalStorageKey.LOGGED_IN}`, "0");
        if (callback) {
          callback(response);
        }
      },
      err => {
        localStorage.setItem(`${environment.team}_${LocalStorageKey.LOGGED_IN}`, "0");
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
