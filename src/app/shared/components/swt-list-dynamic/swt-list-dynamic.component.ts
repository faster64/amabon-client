import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BreakPoint } from '../../constants/break-point.constant';
import { IconButtonType } from '../../constants/button.constant';
import { ExportType, FormMode } from '../../enumerations/common.enum';
import { ObjectHelper } from '../../helpers/object.helper';
import { BaseModel } from '../../models/base/base-model';
import { ColumnGrid } from '../../models/base/column-grid.model';
import { PaginationRequest } from '../../models/base/pagination-request';
import { ServiceResult } from '../../models/base/service-result';
import { Message } from '../../models/message/message';
import { SnackBarParameter } from '../../models/snackbar/snackbar.param';
import { BaseService } from '../../services/base/base.service';
import { Utility } from '../../utils/utility';
import { BaseComponent } from '../base-component';
import { MessageBox } from '../message-box/message-box.component';
import { SnackBar } from '../snackbar/snackbar.component';
import { SwtButton } from '../swt-button/swt-button.component';
import { SwtFilterComponent } from '../swt-filter/swt-filter.component';
import { SwtGridComponent } from '../swt-grid/swt-grid.component';
import { SwtWindowComponent } from '../swt-window/swt-window.component';
import { PopupChooseExportComponent } from './popup-choose-export/popup-choose-export.component';

@Component({
  selector: 'list-dynamic',
  templateUrl: './swt-list-dynamic.component.html',
  styleUrls: ['./swt-list-dynamic.component.scss']
})
export class ListDynamicComponent extends BaseComponent {

  FormMode = FormMode;

  Utility = Utility;

  IconButtonType = IconButtonType;

  @Input()
  displayColumn: ColumnGrid[] = [];

  @Input()
  controller = "";

  @Input()
  serviceName = "";

  @Input()
  pagingUrl = "";

  @Input()
  gridOnly = false;

  @Input()
  enableRowDblclick = true;

  @ViewChild("grid")
  grid!: SwtGridComponent;

  @ViewChild("deleteBtn")
  deleteBtn!: SwtButton;

  data: BaseModel[] = [];

  current = 0;

  total = 0;

  isShowDeleteBtn = false;

  selectedItemCount = 0;

  enableSearch = true;

  popupExportRef!: MatDialogRef<PopupChooseExportComponent>;

  popupFilterRef!: MatDialogRef<SwtFilterComponent>;

  isFirstLoad = true;

  enableEmitScroll = true;

  constructor(
    baseService: BaseService,
    public router: Router,
    public dialog: MatDialog,
    public ngZone: NgZone,
    public cdr: ChangeDetectorRef
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initData() {
    if (this.pagingUrl === '') {
      this.pagingUrl = `${this.baseService.getApiUrl()}/${this.serviceName}/${this.controller}/paging`;
    }
    this.getDataGrid();
  }

  /**
   * Lấy dữ liệu grid
   */
  getDataGrid() {
    this.isLoading = true;
    this.enableEmitScroll = false;
    this.baseService._http.post<ServiceResult>(this.pagingUrl, this.paginationRequest).subscribe(
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
      () => {
        this.isLoading = false;
        this.enableEmitScroll = true;
      }
    )
  }

  reload() {
    this.paginationRequest = new PaginationRequest();
    this.data = [];
    this.current = 0;
    this.total = 0;
    this.isFirstLoad = true;
    this.grid.changeAllCheckBox(false);
    this.grid.table.nativeElement.scrollTop = 0; // reset scroll position
    this.getDataGrid();
  }

  prepareConfig() {
    const config = new MatDialogConfig();
    const position: DialogPosition = {};
    position.top = '100px';

    config.maxWidth = '80%';
    config.maxHeight = `${window.innerHeight * 0.8}px`;
    config.position = position;

    return config;
  }

  openPopupExport() {
    const config = this.prepareConfig();
    config.data = new Message(this, null, () => this.popupExportRef.close());
    this.popupExportRef = this.dialog.open(PopupChooseExportComponent, config);
  }

  onScrollToPosition(e: any) {
    if (!this.enableEmitScroll || this.current >= this.total)
      return;

    this.paginationRequest.pageIndex++;
    this.getDataGrid();
  }

  decideToShowDelete(e: any) {
    if (this.grid.hasCheckedItem()) {
      this.isShowDeleteBtn = true;
      this.enableSearch = false;
      this.selectedItemCount = this.grid.getCheckedItems().length;
    } else {
      this.isShowDeleteBtn = false;
      this.enableSearch = true;
    }
  }

  confirmDelete() {
    MessageBox.confirmDelete(new Message(this, { content: "Các dữ liệu liên quan cũng sẽ bị xóa. Bạn có chắc muốn xóa những dữ liệu này?" }, () => {
      this.deleteCheckedItems();
    }));
    this.deleteBtn.isFinished = true;
  }

  deleteCheckedItems() {
    const ids = this.grid.getCheckedItems().map(item => item.id);
    this.baseService.delete(`${this.baseService.getApiUrl()}/${this.serviceName}/${this.controller}/delete`, ids).subscribe(
      response => {
        if (response.success && response.data) {
          SnackBar.openSnackBarSuccess(new SnackBarParameter(this, "Xóa thành công"));
          this.reload();
        } else {
          MessageBox.information(new Message(this, { content: response.message }));
        }
      },
      err => MessageBox.information(new Message(this, { content: err }))
    )
  }

  toAddForm() {
    this.router.navigateByUrl(`/${this.controller.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}/create`);
  }

  toViewForm(e: any) {
    if (!this.enableRowDblclick)
      return;
    this.router.navigateByUrl(`/${this.controller.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}/view/${e.id}`);
  }

  /**
   * In màn hình
   */
  print() {
    window.print();
  }

  sortGrid(e: any) {
    this.paginationRequest = new PaginationRequest();
    this.paginationRequest.sorts = e.sorts;
    this.data = [];
    this.getDataGrid();
  }

  /**
   * Mở popup filter
   */
  openFilter() {
    Utility.featureIsDeveloping(null);
    return;

    const config = this.prepareConfig();
    if (window.innerWidth <= BreakPoint.SM) {
      config.width = `${window.innerWidth * 0.8}px`;
      config.height = `${window.innerHeight * 0.8}px`;
    } else {
      config.width = `${window.innerWidth * 0.7}px`;
      config.height = `${window.innerHeight * 0.7}px`;
    }

    this.popupFilterRef = this.dialog.open(SwtFilterComponent, config);
    const instance = this.popupFilterRef.componentInstance;
    instance.columns = this.displayColumn.filter(column => !column.disabledFilter);
  }

}
