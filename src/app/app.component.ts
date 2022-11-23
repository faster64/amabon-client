import { Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication/shared/services/authentication.service';
import { Routing } from './shared/constants/common.constant';
import { LocalStorageKey } from './shared/constants/localstorage.key';
import { SettingService } from './shared/services/base/setting.service';
import { TransferDataService } from './shared/services/transfer/transfer-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild("app", { read: ViewContainerRef, static: true })
  containerRef!: ViewContainerRef;

  @ViewChild("appContent", { static: true })
  appContent!: ElementRef;

  @ViewChild("header", { static: true })
  header!: HeaderComponent;

  inProgress = false;

  progressValue = 35;

  /**
   * Danh sách các route hiển thị full màn hình
   */
  fullPageRoutes: PageRoute[] = [];

  priodicalId: any;

  _onDestroySub: Subject<void> = new Subject<void>();

  constructor(
    private transfer: TransferDataService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private cfr: ComponentFactoryResolver,
    private settingService: SettingService
  ) {

  }

  ngOnInit() {
    this.initData();
    this.eventSubscribe();
  }

  /**
   * Khởi tạo dữ liệu
   */
  initData() {
    this.fullPageRoutes = [
      { path: Routing.NOT_FOUND, type: PageRouteType.Equal },
      { path: Routing.ACCESS_DENIED, type: PageRouteType.Equal },
      { path: Routing.LOGIN, type: PageRouteType.Equal },
      { path: Routing.REGISTER, type: PageRouteType.Equal },
      { path: Routing.VERIFY, type: PageRouteType.Equal },
      { path: Routing.VERIFY_REGISTER, type: PageRouteType.StartWith },
      { path: Routing.VERIFY_LOGIN, type: PageRouteType.StartWith },
    ];
  }


  eventSubscribe() {
    this.listenProgress();
    this.routerChangeSubscribe();
    this.initHeader()
    // this.listenChangeSizeSidebar();
  }

  listenProgress() {
    this.transfer.listenInProgress.pipe(takeUntil(this._onDestroySub)).subscribe(response => {
      if (response == true) {
        this.inProgress = true;
        this.progressValue = 35;

        const id = setInterval(() => {
          if (this.progressValue >= 90) {
            clearInterval(id);
            return;
          }

          this.progressValue += 1;
        }, 20);

      } else {
        this.inProgress = false;
      }
    })
  }

  listenChangeSizeSidebar() {
    this.transfer.listenChangeSizeSidebar.pipe(takeUntil(this._onDestroySub)).subscribe((response) => {
      this.changeSizeSidebar(response);
    })
  }

  initHeader() {
    this.transfer.initHeader.pipe(takeUntil(this._onDestroySub)).subscribe(() => {
      this.header.ngOnInit();
    });
  }

  /**
   * Handle khi route change
   */
  routerChangeSubscribe() {
    this.router.events.pipe(takeUntil(this._onDestroySub)).subscribe(async (event: any) => {
      if (event instanceof NavigationStart) {
        this.transfer.listenInProgress.emit(true);
      }

      if (event instanceof NavigationEnd) {
        this.transfer.listenInProgress.emit(false);

        let isFullPage = false;
        for (let i = 0; i < this.fullPageRoutes.length; i++) {
          // if (event.url === '/') {
          //   isFullPage = true;
          //   break;
          // }

          const fullPageRoute = this.fullPageRoutes[i];
          if (fullPageRoute.type === PageRouteType.Equal && `/${fullPageRoute.path}` === event.urlAfterRedirects) {
            isFullPage = true;
            break;
          } else if (fullPageRoute.type === PageRouteType.StartWith && event.urlAfterRedirects.startsWith(`/${fullPageRoute.path}`) && event.urlAfterRedirects !== '/') {
            isFullPage = true;
            break;
          } else if (fullPageRoute.type === PageRouteType.EndWith && event.urlAfterRedirects.endsWith(`/${fullPageRoute.path}`) && event.urlAfterRedirects !== '/') {
            isFullPage = true;
            break;
          }
        }

        this.adjustUI(isFullPage);

        if (!isFullPage) {
          this.containerRef.clear();
          // this.bindingHeaderDynamic();
          // this.bindingSidebarDynamic();
        }
      }

      // Cập nhật module ở header
      this.header.findCurrentModule();
    });
  }

  /**
   * Chỉnh sửa lại UI khi vào form login
   * app-content adjust thành full page
   */
  adjustUI(isFullPage: boolean) {
    const htmlElement = this.appContent.nativeElement as HTMLElement;

    if (isFullPage) {
      this.containerRef.clear();
      htmlElement.style.top = "0";
      // htmlElement.style.left = "0";
    } else {
      htmlElement.style.top = "92px";
      // htmlElement.style.left = "180px";
    }

  }

  changeSizeSidebar(type: string) {
    const htmlElement = this.appContent.nativeElement as HTMLElement;
    if (type === "collapse") {
      htmlElement.style.left = "0";
    } else {
      htmlElement.style.left = "180px";
    }
  }

  /**
   * Binding header
   */
  // async bindingHeaderDynamic() {
  //   const { HeaderComponent } = await import('src/app/shared/components/header/header.component');
  //   const componentFactory = this.cfr.resolveComponentFactory(HeaderComponent);
  //   const componentRef = this.containerRef.createComponent(componentFactory);
  // }

  ngOnDestroy(): void {
    // unsubscribe khi destroy
    if (this._onDestroySub) {
      this._onDestroySub.next();
      this._onDestroySub.complete();
      this._onDestroySub.unsubscribe();
    }
  }

}


interface PageRoute {
  path: string;
  type: PageRouteType;
}

enum PageRouteType {
  Equal = 1,
  StartWith = 2,
  EndWith = 3,
}
