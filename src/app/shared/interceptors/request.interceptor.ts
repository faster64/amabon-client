import {
  HttpClient,
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { RefreshTokenModel } from 'src/app/authentication/shared/models/requests/refresh-token-model';
import { AuthenticationResponse } from 'src/app/authentication/shared/models/responses/authentication-response';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import { MessageBox } from '../components/message-box/message-box.component';
import { SnackBar } from '../components/snackbar/snackbar.component';
import { CommonConstant, ErrorMessageConstant, PerrmisionConstant, Routing } from '../constants/common.constant';
import { CookieKey } from '../constants/cookie.key';
import { NotMessage } from './not-message';
import { CookieHelper } from '../helpers/cookie.hepler';
import { Message } from '../models/message/message';
import { SnackBarParameter } from '../models/snackbar/snackbar.param';
import { LoginStatus } from 'src/app/authentication/shared/enums/login.enum';
import { HttpStatusCodeExtension } from '../enumerations/http-status-code-extension.enum';
@Injectable()
export class RequestHandlingInterceptor implements HttpInterceptor {

  withoutTokens: string[] = [];

  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private takeInfomationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  errorStatus: HttpStatusCode[] = [
    0,
    HttpStatusCode.InternalServerError,
    HttpStatusCode.NotFound,
    HttpStatusCode.BadRequest,
    HttpStatusCode.MethodNotAllowed,
    HttpStatusCode.RequestTimeout,
    HttpStatusCode.Conflict,
    HttpStatusCode.BadGateway,
  ];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.injectToken(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            return this.handleUnauthorized(request, next);

          case HttpStatusCodeExtension.MissingClientInfo:
            return this.handle901(request, next);

          case HttpStatusCode.Forbidden:
            SnackBar.openSnackBarDanger(new SnackBarParameter(null, PerrmisionConstant.NOT_PERMISSION, ''));
            break;

          case HttpStatusCode.TooManyRequests:
            MessageBox.information(new Message(this, { content: "Spam detected!" }));
            break;

          default:
            if (this.errorStatus.includes(error.status)) {
              const enableShowError = environment.enableShowError;
              if (!enableShowError && this.checkShowMessgae(error)) {
                MessageBox.information(new Message(this, { content: ErrorMessageConstant.HAS_ERROR_MESSAGE }));
              }
              else if (this.checkShowMessgae(error)) {
                MessageBox.information(new Message(this, { content: `${error.message}` }));
              }
            }
            break;
        }
        // if (error.status === 0) {
        //   console.log(error)
        //   MessageBox.information(new Message(this, {title: "ERR_CERT_AUTHORITY_INVALID (Api chưa có https)", content: "Chọn \"Đồng ý\" => Nâng cao => Tiếp tục truy cập 103.179.191.139" })).subscribe(response => {
        //     window.open('https://103.179.191.139:6002/health')?.focus();
        //   });
        // }
        return throwError(error.error);
      })
    );
  }

  handle901(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authenticationService.takingInfo) {
      return this.takeInfomationSubject.pipe(
        filter(v => v != null),
        take(1),
        switchMap(() => {
          return next.handle(this.injectToken(request)).pipe(
            // xử lý case 901 xong thì 401
            catchError((error: HttpErrorResponse) => {
              if (error.status === HttpStatusCode.Unauthorized) {
                return this.handleUnauthorized(request, next);
              }
              return throwError(error.error);
            })
          );
        })
      );
    }
    this.authenticationService.takingInfo = true;
    return this.authenticationService.getIpInformation().pipe(
      switchMap(response => {
        this.authenticationService.takingInfo = false;
        this.authenticationService.ipInformation = response;
        this.authenticationService.saveIpInformation(JSON.stringify(response));
        this.takeInfomationSubject.next(response);

        return next.handle(this.injectToken(request));
      }),
      catchError((error: HttpErrorResponse) => {
        this.authenticationService.takingInfo = false;

        // xử lý case 901 xong thì 401
        if (error.status === HttpStatusCode.Unauthorized) {
          return this.handleUnauthorized(request, next);
        }
        return throwError(error.error);
      })
    )
  }

  /**
   * Xử lý khi unauthorized
   */
  handleUnauthorized(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // 1 vài request ko refresh token
    if (request.url.includes("logout")) {
      return throwError("");
    }

    // Nếu đang refresh thì request khác đợi
    if (this.authenticationService.refreshing) {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => {
          return next.handle(this.injectToken(request));
        })
      );
    }

    this.authenticationService.refreshing = true;
    return this.refreshToken().pipe(
      switchMap(response => {
        this.authenticationService.refreshing = false;
        // success thì tiếp tục request
        if (response.code == HttpStatusCode.Ok) {
          CookieHelper.setCookie(`${environment.team}_${CookieKey.LOGGED_IN}`, '1', this.authenticationService.cookieExprie);
          this.authenticationService.saveAuthConfig(response);
          this.refreshTokenSubject.next(response.accessToken);

        } else {
          this.logout();
          return throwError("");
        }

        return next.handle(this.injectToken(request));
      }),
      catchError((e: HttpErrorResponse) => {
        this.authenticationService.refreshing = false;
        return throwError(e.error);
      })
    )

  }

  /**
   * Inject token vào request
   */
  injectToken(request: HttpRequest<unknown>) {
    if (this.withoutTokens.includes(request.url))
      return request;

    return request.clone({
      setHeaders: {
        // 'Content-Type': 'application/json; charset=utf-8',
        // 'Accept': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${this.authenticationService.getAccessToken()}`,
        'X-Amabon-Client': this.authenticationService.ipInformation ? JSON.stringify(this.authenticationService.ipInformation) : "",
      },
    });
  }

  refreshToken() {
    const refresh = new RefreshTokenModel();
    refresh.userId = this.authenticationService.getUserId() || CommonConstant.ZERO_GUID;
    refresh.refreshToken = this.authenticationService.getRefreshToken();

    return this.authenticationService.refreshToken(refresh);
  }

  logout() {
    const currentStatus = this.authenticationService.getLoginStatus();
    this.authenticationService.logout((response: AuthenticationResponse) => {
      if (currentStatus === LoginStatus.LoggedIn) {
        SnackBar.openSnackBarDanger(new SnackBarParameter(null, PerrmisionConstant.SESSION_EXPRIED, '', 2000));
      }
      return this.router.navigateByUrl(`/${Routing.LOGIN.path}`);
    });
  }

  checkShowMessgae(error: HttpErrorResponse): boolean {
    return NotMessage.endpoints.findIndex(endpoint => error.url == `${environment.api_url}/${endpoint}`) === -1;
  }
}
