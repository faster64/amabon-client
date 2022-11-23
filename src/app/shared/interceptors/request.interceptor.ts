import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { RefreshTokenModel } from 'src/app/authentication/shared/models/requests/refresh-token-model';
import { AuthResult } from 'src/app/authentication/shared/models/responses/auth-result';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import { MessageBox } from '../components/message-box/message-box.component';
import { SnackBar } from '../components/snackbar/snackbar.component';
import { CommonConstant, ErrorMessageConstant, PerrmisionConstant, Routing } from '../constants/common.constant';
import { LocalStorageKey } from '../constants/localstorage.key';
import { NotMessage } from '../constants/not-message.constant';
import { Message } from '../models/message/message';
import { SnackBarParameter } from '../models/snackbar/snackbar.param';
import { TransferDataService } from '../services/transfer/transfer-data.service';
@Injectable()
export class RequestHandlingInterceptor implements HttpInterceptor {

  withoutTokens: string[] = [];

  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

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
    private transfer: TransferDataService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.injectToken(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          return this.handleUnauthorized(request, next);

        } else if (error.status === HttpStatusCode.Forbidden) {
          SnackBar.openSnackBarDanger(new SnackBarParameter(null, PerrmisionConstant.NOT_PERMISSION, '', SnackBar.forever));

        } else if (error.status === HttpStatusCode.TooManyRequests) {
          MessageBox.information(new Message(this, { content: "Chú request hơi nhiều rồi đọ" }));

        } else if (this.errorStatus.includes(error.status)) {
          const enableShowError = environment.enableShowError;
          if (!enableShowError && !NotMessage.endpoints.map(e => `${environment.api_url}/${e}`).includes(`${error.url}`)) {
            MessageBox.information(new Message(this, { content: ErrorMessageConstant.HAS_ERROR_MESSAGE }));

          } else if (!NotMessage.endpoints.map(e => `${environment.api_url}/${e}`).includes(`${error.url}`)) {
            MessageBox.information(new Message(this, { content: `${error.message}` }));
          }
        }

        return throwError(error.error);
      })
    );
  }

  /**
   * Xử lý khi unauthorized
   */
  handleUnauthorized(request: HttpRequest<unknown>, next: HttpHandler) {

    // 1 vài request ko refresh token
    if (request.url.includes("logout")) {
      return throwError("");
    }

    // Nếu đang refresh thì request khác đợi
    if (this.authenticationService.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => {
          return next.handle(this.injectToken(request));
        })
      );
    }
    else {
      this.authenticationService.isRefreshing = true;
      return this.refreshToken().pipe(
        switchMap(response => {

          this.authenticationService.isRefreshing = false;
          // success thì tiếp tục request
          if (response.code == HttpStatusCode.Ok) {
            localStorage.setItem(`${environment.team}_${LocalStorageKey.LOGGED_IN}`, '1');
            this.authenticationService.saveAuthConfig(response);
            this.refreshTokenSubject.next(response.accessToken);

          } else {
            this.logout();
            return throwError("");
          }

          return next.handle(this.injectToken(request));
        }),
        catchError(error => {
          this.authenticationService.isRefreshing = false;
          return throwError(error.error);
        })
      )
    }
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
        'Authorization': `Bearer ${this.authenticationService.getToken()}`,
      },
    });
  }

  /**
   * Refresh token
   */
  refreshToken() {
    const refresh = new RefreshTokenModel();
    refresh.userId = this.authenticationService.getUserId() || CommonConstant.ZERO_GUID;
    refresh.refreshToken = this.authenticationService.getRefreshToken();

    return this.authenticationService.refreshToken(refresh);
  }

  /**
   * Đăng xuất
   */
  logout() {
    this.authenticationService.logout((response: AuthResult) => {
      SnackBar.openSnackBarDanger(new SnackBarParameter(null, PerrmisionConstant.SESSION_EXPRIED, '', 2000));
      return this.router.navigateByUrl(`/${Routing.LOGIN}`);
    });
  }
}
