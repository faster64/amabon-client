import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonColor } from 'src/app/shared/constants/button.constant';
import { ErrorMessageConstant } from 'src/app/shared/constants/common.constant';
import { ExportType } from 'src/app/shared/enumerations/common.enum';
import { Message } from 'src/app/shared/models/message/message';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { ExcelService } from 'src/app/shared/services/base/excel.service';
import { BaseComponent } from '../../base-component';
import { SwtButton } from '../../swt-button/swt-button.component';
import { SwtGridComponent } from '../../swt-grid/swt-grid.component';
import { ListDynamicComponent } from '../swt-list-dynamic.component';

@Component({
  selector: 'app-popup-choose-export',
  templateUrl: './popup-choose-export.component.html',
  styleUrls: ['./popup-choose-export.component.scss']
})
export class PopupChooseExportComponent extends BaseComponent {
  ButtonColor = ButtonColor;

  ExportType = ExportType;

  exportTypeSelected = ExportType.OnScreen;

  infoExportOnScreen = "Hệ thống sẽ thực hiện xuất khẩu toàn bộ bản ghi tại danh sách. Sau khi hoàn thành, anh/chị nhấn vào \"Tải xuống\" để tải về tệp tin xuất khẩu."

  infoExportAll = "Hệ thống sẽ thực hiện xuất khẩu toàn bộ dữ liệu. Sau khi hoàn thành, anh/chị nhấn vào \"Tải xuống\" để tải về tệp tin xuất khẩu."

  isShowMessage = false;

  isDone = false;

  message = "Đang xuất khẩu, vui lòng chờ...";

  downloadSuccess = false;

  key = "";

  serviceName = "";

  @ViewChild("exportBtn")
  exportBtn!: SwtButton;

  constructor(
    baseService: BaseService,
    public excelService: ExcelService,
    @Inject(MAT_DIALOG_DATA) public data: Message,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
      super.ngOnInit();
      this.serviceName = this.data.data['service'];
  }

  /**
   * Cập nhật loại xuất khẩu đc chọn
   */
  updateExportTypeSelected(e: any) {
    this.exportTypeSelected = parseInt(e.value);
  }


  export() {
    this.isShowMessage = true;
    if (this.exportTypeSelected == ExportType.All) {
      this.paginationRequest.pageSize = 1000;
    }

    const module = (this.data.sender as ListDynamicComponent).controller;
    this.excelService.serviceName = this.serviceName;
    this.excelService.getExportKey(module, this.paginationRequest).subscribe(
      response => {
        if (response.success) {
          this.isDone = true;
          this.message = "Dữ liệu đã sẵn sàng, tải ngay...";
          this.key = response.message;
        } else {
          this.message = ErrorMessageConstant.HAS_ERROR_MESSAGE;
          this.exportBtn.isFinished = true;
        }
      },
      error => {
        this.exportBtn.isFinished = true;
        this.isShowMessage = false;
      }
    )
  }

  download() {
    const module = (this.data.sender as ListDynamicComponent).controller;
    window.location.href = `${this.excelService.getApiUrl()}/${this.serviceName}/excel/${module}/export?key=${this.key}`;
    this.downloadSuccess = true;

    setTimeout(() => {
      this.data.callback();
    }, 1000);
  }
}
