import { HttpStatusCode } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { ListDynamicComponent } from 'src/app/shared/components/swt-list-dynamic/swt-list-dynamic.component';
import { SessionStorageKey } from 'src/app/shared/constants/sessionstorage.key';
import { CookieHelper } from 'src/app/shared/helpers/cookie.hepler';
import { ObjectHelper } from 'src/app/shared/helpers/object.helper';
import { ServiceResult } from 'src/app/shared/models/base/service-result';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { PopupService } from 'src/app/shared/services/base/popup.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { CreateFolderPopupComponent } from '../folder-popup/folder-popup.component';

@Component({
  selector: 'storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.scss']
})
export class StorageListComponent extends ListDynamicComponent {

  isShowRenameBtn = false;

  @Output()
  notPermissionEvent = new EventEmitter();

  @ViewChild("renameBtn")
  renameBtn!: SwtButton;

  constructor(
    baseService: BaseService,
    router: Router,
    dialog: MatDialog,
    ngZone: NgZone,
    cdr: ChangeDetectorRef,
    public popupService: PopupService,
    public storageService: StorageService,
  ) {
    super(baseService, router, dialog, ngZone, cdr);
  }


  /**
   * Override
   */
  getDataGrid() {
    this.isLoading = true;
    this.enableEmitScroll = false;
    this.baseService.takeOriginHttpClient().post<ServiceResult>(this.pagingUrl, this.paginationRequest, {
      headers: {
        "X-Secret-Key": CookieHelper.getCookie(`${environment.team}_${SessionStorageKey.SECRET_KEY}`) || ""
      }
    }).subscribe(
      response => {
        this.isLoading = false;
        this.isFirstLoad = false;
        this.enableEmitScroll = true;
        if (response.success && response.data) {
          const dataClone = ObjectHelper.clone(this.data);
          this.data = dataClone;
          (response.data as Array<any>).forEach(item => {
            this.data.push(item);
          })
          this.current = this.data.length;
          this.total = response.total;
        } else {
          MessageBox.information(new Message(this, { content: response.message }));
        }
      },
      error => {
        this.isLoading = false;
        this.enableEmitScroll = true;
        if (error.code === HttpStatusCode.Forbidden) {
          this.notPermissionEvent.emit(true);
        }
      }
    )
  }

  decideToShowButtons(e: any) {
    super.decideToShowButtons(e);
    if (this.selectedItemCount === 1) {
      this.isShowRenameBtn = true;
    } else {
      this.isShowRenameBtn = false;
    }
  }

  rename() {
    this.renameBtn.isFinished = true;

    const config = this.popupService.getBaseConfig();
    config.data = {
      mode: this.FormMode.Edit,
      folder: this.grid.getCheckedItems()[0]
    }

    this.dialog.open(CreateFolderPopupComponent, config).afterClosed().subscribe( response => {
      if(response) {
        this.reload();
      }
    });
  }

  deleteCheckedItems() {
    const ids = this.grid.getCheckedItems().map(item => item.id);
    this.storageService.delete(`${this.baseService.getApiUrl()}/${this.serviceName}/${this.controller}/delete`, ids).subscribe(
      response => {
        if (response.success && response.data) {
          SnackBar.openSnackBarSuccess(new SnackBarParameter(this, "Xóa thành công"));
          this.reload();
        } else {
          MessageBox.information(new Message(this, { content: response.message }));
        }
      }
    )
  }
}
