import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageBoxModule } from './shared/components/message-box/message-box.module';
import { SnackbarModule } from './shared/components/snackbar/snackbar.module';
import { RequestHandlingInterceptor } from './shared/core/interceptors/request.interceptor';
import './shared/extension-methods/array-extension';
import './shared/extension-methods/string-extension';
import { SharedModule } from './shared/shared.module';
// import { OnlineStatusModule } from 'ngx-online-status';
import { UpdateAvatarPopupComponent } from './components/user/popups/update-avatar-popup/update-avatar-popup.component';
import { GlobalErrorHandler } from './shared/core/global-error-handler';

// import {
//   SocialLoginModule,
//   SocialAuthServiceConfig,
//   GoogleLoginProvider,
// } from 'angularx-social-login';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    UpdateAvatarPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'vi',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    SnackbarModule,
    MessageBoxModule,
    BrowserTransferStateModule,
    // OnlineStatusModule
    // SocialLoginModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHandlingInterceptor,
      multi: true
    },
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider('483405168173-ng58air6q83sgnmeo80sc6g0gsm2nmpf.apps.googleusercontent.com'),
    //       },
    //     ],
    //   } as SocialAuthServiceConfig,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
