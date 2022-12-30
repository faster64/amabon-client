import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { Routing } from 'src/app/shared/constants/common.constant';
import { SessionStorageKey } from 'src/app/shared/constants/sessionstorage.key';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { environment } from 'src/environments/environment';
import { Folder } from 'src/app/shared/models/storage/folder/folder.model';
import { CookieHelper } from 'src/app/shared/helpers/cookie.hepler';
import { CookieKey } from 'src/app/shared/constants/cookie.key';
import { ColumnGrid } from 'src/app/shared/models/base/column-grid.model';
import { ListDynamicComponent } from 'src/app/shared/components/swt-list-dynamic/swt-list-dynamic.component';
import { GroupBoxFieldType } from 'src/app/shared/enumerations/common.enum';
import { MatDialog } from '@angular/material/dialog';
import { CreateFolderPopupComponent } from './create-folder-popup/create-folder-popup.component';
import { PopupService } from 'src/app/shared/services/base/popup.service';
import { SharedService } from 'src/app/shared/services/base/shared.service';
import { DeviceType } from 'src/app/shared/enumerations/device.enum';
import { StringHelper } from 'src/app/shared/helpers/string.helper';

@Component({
  selector: 'app-secret-files',
  templateUrl: './secret-files.component.html',
  styleUrls: ['./secret-files.component.scss']
})
export class SecretFilesComponent extends BaseComponent {

  passSecurity = false;

  secretKey = "";

  folders: Folder[] = [];

  displayColumn: ColumnGrid[] = [];

  firstSet = true;

  customizeViewUrl = '';

  continue = "";

  @ViewChild("commitBtn") commitBtn!: SwtButton;

  @ViewChild("listDynamic") listDynamic!: ListDynamicComponent;

  constructor(
    baseService: BaseService,
    public authenticationService: AuthenticationService,
    public storageService: StorageService,
    public router: Router,
    public dialog: MatDialog,
    public popupService: PopupService,
    public sharedService: SharedService,
    public activatedRoute: ActivatedRoute,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.continue = this.activatedRoute.snapshot.queryParams['continue'];
    this.passSecurity = sessionStorage.getItem(`${environment.team}_${SessionStorageKey.PASSED_SECURITY}`) != null;
    this.customizeAddFunc = this.customizeAddFunc.bind(this);
  }

  initData() {
    this.displayColumn = [];
    this.displayColumn.push({ column: 'folderName', displayText: 'Thư mục', width: this.sharedService.deviceType === DeviceType.Desktop ? 300 : 240 });
    this.displayColumn.push({ column: 'createdDate', displayText: 'Ngày tạo', width: 120, type: GroupBoxFieldType.Date });
  }

  commit() {
    if (this.secretKey === '') {
      this.commitBtn.isFinished = true;
      return;
    }

    this.authenticationService.verifySecretKey(this.secretKey).subscribe(
      response => {
        this.commitBtn.isFinished = true;

        if (response.success) {
          this.passSecurity = true;
          CookieHelper.setCookie(`${environment.team}_${SessionStorageKey.SECRET_KEY}`, response.data, 1 / 24);

          // this.getFolders();
          sessionStorage.setItem(`${environment.team}_${SessionStorageKey.PASSED_SECURITY}`, "passed");

          if (!StringHelper.isNullOrEmpty(this.continue)) {
            this.router.navigateByUrl(`/${Routing.STORAGE.path}/view-files/${this.continue}`);
          }

        } else {
          SnackBar.openSnackBarDanger(new SnackBarParameter(this, "Mã bí mật không đúng!"));
        }
      },
      () => this.commitBtn.isFinished = true
    )
  }

  commitByEnter() {
    this.commitBtn.clickExecute(null);
  }

  customizeViewFunc(e: any) {
    this.router.navigateByUrl(`/${Routing.STORAGE.path}/view-files/${btoa(e.folderName)}`);
  }

  customizeAddFunc() {
    this.listDynamic.addBtn.isFinished = true;
    this.dialog.open(CreateFolderPopupComponent, this.popupService.getBaseConfig()).afterClosed().subscribe(() => {
      this.listDynamic.reload();
    });
  }
}
