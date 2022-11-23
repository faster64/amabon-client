import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Routing } from '../../constants/common.constant';
import { LocalStorageKey } from '../../constants/localstorage.key';
import { SessionStorageKey } from '../../constants/sessionstorage.key';
import { UserSetting } from '../../models/setting/setting.model';
import { BaseService } from '../../services/base/base.service';
import { SettingService } from '../../services/base/setting.service';
import { TransferDataService } from '../../services/transfer/transfer-data.service';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'swt-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent implements AfterViewInit {

  currentIndex!: number;

  status = "expand";

  items: RouteItem[] = [];

  @ViewChild("sidebar")
  sidebar!: any;

  constructor(
    baseService: BaseService,
    private router: Router,
    private transfer: TransferDataService,
    private settingService: SettingService
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initData();
  }

  ngAfterViewInit() {
    this.initSidebarSize();
  }

  initData() {
    this.initRouteItem();
    this.transfer.userSettingEvent.pipe(takeUntil(this._onDestroySub)).subscribe((response: UserSetting) => {
      if (response) {
        if (response.sidebarSetting) {
          this.status = response.sidebarSetting.status;
          this.transfer.listenChangeSizeSidebar.emit(this.status);

          if (this.status == "collapse") {
            (this.sidebar as ElementRef).nativeElement.style.width = "0";
          } else {
            (this.sidebar as ElementRef).nativeElement.style.width = "180px";
          }
        }
      }
    })
  }

  initSidebarSize() {
    const storageValue = localStorage.getItem(`${environment.team}_${LocalStorageKey.SETTING}`);
    if (storageValue) {
      const setting = JSON.parse(storageValue);
      if (setting && JSON.stringify(setting) !== "{}") {
        const sidebarSetting = setting["sidebarSetting"];
        if (sidebarSetting) {
          const status = sidebarSetting["status"];
          this.transfer.listenChangeSizeSidebar.emit(status);
          if (status == "collapse") {
            (this.sidebar as ElementRef).nativeElement.style.width = "0";
          } else {
            (this.sidebar as ElementRef).nativeElement.style.width = "180px";
          }
        }
      }
    }

  }

  initRouteItem() {
  }

  changeModule(module: string) {
    this.router.navigateByUrl(`/${module}`);
  }

  changeSize() {
    if (this.status == "collapse") this.status = "expand";
    else this.status = "collapse";

    this.transfer.listenChangeSizeSidebar.emit(this.status);

    if (this.status == "collapse") {
      (this.sidebar as ElementRef).nativeElement.style.width = "0";
    } else {
      (this.sidebar as ElementRef).nativeElement.style.width = "180px";
    }

    this.updateSidebarSetting();
  }

  updateSidebarSetting() {
    const setting = localStorage.getItem(`${environment.team}_${LocalStorageKey.SETTING}`) || "";
    let settingModel: any;

    if (!setting || setting === "" || setting === "null" || setting === "undefined") {
      settingModel = {
        sidebarSetting: {
          status: this.status
        }
      };
    }
    else {
      settingModel = JSON.parse(setting);
      if (settingModel["sidebarSetting"]) {
        settingModel["sidebarSetting"] = Object.assign(settingModel["sidebarSetting"], { status: this.status });
      } else {
        settingModel["sidebarSetting"] = {
          status: this.status
        }
      }
    }
    localStorage.setItem(`${environment.team}_${LocalStorageKey.SETTING}`, JSON.stringify(settingModel));
    this.settingService.updateSetting(settingModel).subscribe();
  }

  redirect(path: string, index: number) {
    this.currentIndex = index;
    sessionStorage.setItem(`${environment.team}_${SessionStorageKey.SIDEBAR_INDEX}`, index + "");
    this.router.navigateByUrl(`/${path}`);
  }
}

export class RouteItem {
  public path = "";
  public displayText = "";
  public iconPosition = "";
  public iconPositionHover?= "";
}
