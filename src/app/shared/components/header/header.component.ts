import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DxoCommonPaneSettingsComponent } from 'devextreme-angular/ui/nested';
import { of } from 'rxjs';
import { LoginStatus } from 'src/app/authentication/shared/enums/login.enum';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import { ButtonColor } from '../../constants/button.constant';
import { Routing } from '../../constants/common.constant';
import { CookieKey } from '../../constants/cookie.key';
import { ActionPermission } from '../../enumerations/permission.enum';
import { CookieHelper } from '../../helpers/cookie.hepler';
import { PermissionHelper } from '../../helpers/permission.helper';
import { StringHelper } from '../../helpers/string.helper';
import { PaginationRequest } from '../../models/base/pagination-request';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../../services/base/base.service';
import { TransferDataService } from '../../services/transfer/transfer-data.service';
import { AvatarService } from '../../services/user/avatar.service';
import { Utility } from '../../utils/utility';
import { BaseComponent } from '../base-component';
import { SwtButton } from '../swt-button/swt-button.component';

interface ModuleHeader {
  moduleName: string;
  path: string;
  iconPosition: string;
  iconCheckedPosition: string;
}

@Component({
  selector: 'swt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements AfterViewInit {
  ButtonColor = ButtonColor;

  Utility = Utility;

  LoginStatus = LoginStatus;

  @ViewChildren("modules")
  moduleInstances!: QueryList<ElementRef>;

  @ViewChildren("modulesR")
  moduleInstancesR!: QueryList<ElementRef>;

  moduleWidths: number[] = [];

  @ViewChild("logoutBtn")
  logoutBtn!: SwtButton;

  modules: ModuleHeader[] = [];

  currentIndex = 0;

  breakPointIndex = 9999;

  fullName = '';

  avatarUrl = '';

  avatarNameDefault = '';

  timer: any;

  isLoadingModule = false;

  isLoadingAvatar = true;

  loginStatus: LoginStatus = LoginStatus.Unknown;

  constructor(
    baseService: BaseService,
    public router: Router,
    public location: Location,
    public authenticationService: AuthenticationService,
    public avatarService: AvatarService,
    public transfer: TransferDataService,
    public cdr: ChangeDetectorRef
  ) {
    super(baseService);
  }


  ngOnInit(): void {
    this.checkLoginStatus();
    if (this.loginStatus === LoginStatus.Unknown) {
      this.loginStatus = LoginStatus.UnLoggedIn;
    }

    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.calcToDisplayModules();
    window.addEventListener('resize', () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.calcToDisplayModules();
      }, 100);
    });
  }

  initData() {
    this.setFullName();
    this.intiModules();
    this.findCurrentModule();
    this.getAvatarUrl();
  }

  checkLoginStatus() {
    this.loginStatus = this.authenticationService.getLoginStatus();
  }

  setFullName() {
    const firstName = CookieHelper.getCookie(`${environment.team}_first_name`) || '';
    const lastName = CookieHelper.getCookie(`${environment.team}_last_name`) || '';
    this.fullName = `${firstName} ${lastName}`;
  }

  getAvatarUrl() {
    this.avatarService.getAvatarUrl().subscribe(
      response => {
        this.isLoadingAvatar = false;
        if (response.success) {
          if (StringHelper.isNullOrEmpty(response.data)) {
            this.avatarNameDefault = this.getAvatarNameDefault();
          } else {
            this.avatarUrl = response.data;
          }

        } else {
          this.avatarNameDefault = this.getAvatarNameDefault();
        }
      },
      error => {
        this.isLoadingAvatar = false;
        this.avatarNameDefault = this.getAvatarNameDefault();
      }
    )
  }

  getAvatarNameDefault() {
    const lastName = CookieHelper.getCookie(`${environment.team}_${CookieKey.LAST_NAME}`);
    if (lastName === null || lastName.length === 0) {
      return "";
    }

    return lastName[0].toUpperCase();
  }

  /**
   * Khởi tạo module
   */
  intiModules() {
    this.defaultModules();
    this.calcToDisplayModules();
    this.findCurrentModule();
  }

  defaultModules() {
    this.modules = [];
    this.modules.push({
      path: Routing.DASHBOARD.path,
      moduleName: Routing.DASHBOARD.name,
      iconPosition: '0 -272px',
      iconCheckedPosition: '0px -288px',
    });
    // this.modules.push({
    //   path: Routing.TAX_CONVERTER,
    //   moduleName: 'Thuế converter',
    //   iconPosition: '0px -304px',
    //   iconCheckedPosition: '-16px -304px',
    // });
    this.modules.push({
      path: Routing.SECRET_FILES.path,
      moduleName: Routing.SECRET_FILES.name,
      iconPosition: '-128px -272px',
      iconCheckedPosition: '-128px -287px',
    });
    this.modules.push({
      path: Routing.AMAZON_STORAGE.path,
      moduleName: Routing.AMAZON_STORAGE.name,
      iconPosition: '-16px -48px',
      iconCheckedPosition: '-144px -240px',
    });
    this.modules.push({
      path: Routing.CALENDAR_CONVERTER.path,
      moduleName: Routing.CALENDAR_CONVERTER.name,
      iconPosition: '-63px -272px',
      iconCheckedPosition: '-63px -288px',
    });
    this.modules.push({
      path: Routing.CONTACT.path,
      moduleName: Routing.CONTACT.name,
      iconPosition: '0px -64px',
      iconCheckedPosition: '-384px -272px',
    });
  }

  calcToDisplayModules() {
    if (!this.moduleInstances || this.moduleInstances.length === 0)
      return;

    if (!this.moduleWidths.length)
      this.moduleWidths = (this.moduleInstances as any)["_results"].map((instance: any) => (instance.nativeElement as HTMLElement).offsetWidth);

    const screenWidth = window.innerWidth;
    let sumWidth = 0;

    this.breakPointIndex = 9999;
    for (let index = 0; index < this.moduleWidths.length; index++) {
      const width = this.moduleWidths[index];
      sumWidth += width;
      if (sumWidth + 128 >= screenWidth) {
        this.breakPointIndex = index;
        break;
      }
    }
    this.cdr.detectChanges();
  }

  getWaitPostCount() {
    if (PermissionHelper.getUserPermission() !== ActionPermission.All) {
      const result = new ServiceResult();
      result.success = false;
      return of(result);
    }

    const paginationRequest = new PaginationRequest();
    paginationRequest.pageSize = 1;
    return this.baseService._http.post<ServiceResult>(`${this.baseService.getApiUrl()}/systempost/wait-approval-paging`, paginationRequest);
  }

  /**
   * Bay tới phân hệ chỉ định
   */
  routeUrl(path: string) {
    this.router.navigateByUrl(`/${path}`);
  }

  findCurrentModule() {
    const path = this.location.path();

    // tìm chính xác trước, nếu không thấy tìm startsWith
    const pathSplit = path.split('/');
    if (pathSplit.length >= 1) {
      const index = this.modules.findIndex((m) => m.path === pathSplit[1]);
      if (index !== -1) {
        this.currentIndex = index;
        return;
      }
    }

    this.currentIndex =
      this.modules.findIndex((m) => path.startsWith(`/${m.path}`)) || 0;
  }

  logout() {
    this.transfer.listenInProgress.emit(true);
    this.authenticationService.logout(() => {
      this.transfer.listenInProgress.emit(false);
      this.router.navigateByUrl(`/${Routing.LOGIN.path}`);
      this.logoutBtn.isFinished = true;
    });
  }

  goToDashboard() {
    this.router.navigate([`/${Routing.DASHBOARD.path}`]);
  }

  goToLogin() {
    this.router.navigate([`/${Routing.LOGIN.path}`]);
  }

  redirect(path: string, index: number) {
    this.currentIndex = index;
    this.router.navigateByUrl(`/${path}`);
  }

  openUpdateAvatarPopup(e: any) {
    e.preventDefault();
    const ref = this.avatarService.openUpdateAvatarPopup();
    const x = 1;
  }
}
