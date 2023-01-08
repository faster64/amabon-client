import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { SwtButton } from 'src/app/shared/components/swt-button/swt-button.component';
import { IconButtonType } from 'src/app/shared/constants/button.constant';
import { FormMode, Priority } from 'src/app/shared/enumerations/common.enum';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { DutyCategory } from 'src/app/shared/models/duty/duty-category.model';
import { Duty } from 'src/app/shared/models/duty/duty.model';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { DutyCategoryService } from 'src/app/shared/services/duty/duty-category.service';
import { DutyService } from 'src/app/shared/services/duty/duty.service';

@Component({
  selector: 'app-duty-detail',
  templateUrl: './duty-detail.component.html',
  styleUrls: ['./duty-detail.component.scss']
})
export class DutyDetailComponent extends BaseComponent {
  DateHelper = DateHelper;

  IconButtonType = IconButtonType;

  FormMode = FormMode;

  @ViewChild("saveBtn")
  saveBtn!: SwtButton;

  @ViewChild("saveAndAddBtn")
  saveAndAddBtn!: SwtButton;

  @ViewChild("editBtn")
  editBtn!: SwtButton;

  @ViewChild("completeBtn")
  completeBtn!: SwtButton;

  @ViewChild("uncompleteBtn")
  uncompleteBtn!: SwtButton;

  categories: DutyCategory[] = [];

  formMode: FormMode = FormMode.None;

  priotitySource = [
    { id: Priority.Urgent, text: 'Khẩn cấp' },
    { id: Priority.Important, text: 'Quan trọng' },
    { id: Priority.High, text: 'Cao' },
    { id: Priority.Medium, text: 'Vừa' },
    { id: Priority.Low, text: 'Thấp' },
  ];

  periodSource = [
    { id: 1, text: 'Mỗi phút' },
    { id: 3, text: 'Mỗi 3 phút' },
    { id: 30, text: 'Mỗi 30 phút' },
    { id: 60, text: 'Mỗi giờ' },
    { id: 360, text: 'Mỗi 6 giờ' },
    { id: 720, text: 'Mỗi 12 giờ' },
    { id: 1440, text: 'Mỗi ngày' },
    { id: 4320, text: 'Mỗi 3 ngày' },
    { id: 10080, text: 'Mỗi tuần' },
    { id: 43200, text: 'Mỗi tháng' },
  ];

  duty = new Duty();

  constructor(
    baseService: BaseService,
    public dutyService: DutyService,
    public dutyCategoryService: DutyCategoryService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public configData: any
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initData() {
    this.formMode = this.configData["formMode"];
    this.duty.categoryId = this.configData["categoryId"];

    if (this.formMode == FormMode.Add) {
      this.duty.priority = Priority.High;
      this.getCategories(null);
    } else {
      this.duty.priority = (this.configData["duty"] as Duty).priority;
      const dutyObservable = this.dutyService.getById("", (this.configData["duty"] as Duty).id);
      const dutyCategoriesObservable = this.dutyCategoryService.getAll();

      this.isLoading = true;
      forkJoin(dutyObservable, dutyCategoriesObservable).subscribe(responses => {
        if (responses[0].success && responses[0].data) {
          this.duty = responses[0].data;
        }
        if (responses[1].success && responses[1].data) {
          responses[1].data = responses[1].data.sort((a: DutyCategory, b: DutyCategory) => a.sortOrder - b.sortOrder)
          this.categories = responses[1].data;
        }
        this.isLoading = false;
      })
    }

  }


  getCategories(e: any) {
    if (this.categories && this.categories.length)
      return;

    this.dutyCategoryService.getAll().subscribe(response => {
      if (response.success && response.data) {
        response.data = response.data.sort((a: DutyCategory, b: DutyCategory) => a.sortOrder - b.sortOrder)
        this.categories = response.data;
      }
    })
  }

  setDate(e: any, type: string) {
    if (type === 'fromDate') {
      this.duty.fromDate = new Date(e.value);
    } else {
      this.duty.toDate = new Date(e.value);
    }
  }

  changeStatus(e: any) {
    this.duty.isCompleted = e.value;
  }

  checkedByLabel(duty: Duty) {
    if (this.formMode !== FormMode.View)
      duty.isCompleted = !duty.isCompleted
  }

  changeNotifyStatus(e: any) {
    this.duty.dutyPeriod.enableNotify = e.value;
  }

  checkedByNotifyLabel() {
    if (this.formMode !== FormMode.View)
      this.duty.dutyPeriod.enableNotify = !this.duty.dutyPeriod.enableNotify;
  }

  close() {
    this.configData.closeFn();
  }

  validateBeforeSave() {
    if (StringHelper.isNullOrEmpty(this.duty.dutyName)) {
      MessageBox.information(new Message(this, { content: 'Tên công việc không được để trống' }));
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.duty.content)) {
      MessageBox.information(new Message(this, { content: 'Nội dung công việc không được để trống' }));
      return false;
    }
    if (!this.duty.fromDate || DateHelper.compare(new Date(this.duty.fromDate), new Date(0)) === 0) {
      MessageBox.information(new Message(this, { content: 'Ngày bắt đầu không được để trống' }));
      return false;
    }
    if (!this.duty.toDate || DateHelper.compare(new Date(this.duty.toDate), new Date(0)) === 0) {
      MessageBox.information(new Message(this, { content: 'Ngày kết thúc không được để trống' }));
      return false;
    }
    if (DateHelper.compare(this.duty.fromDate, this.duty.toDate) > 0) {
      MessageBox.information(new Message(this, { content: 'Ngày kết thúc phải lớn hơn ngày bắt đầu' }));
      return false;
    }
    if (!this.duty.priority) {
      MessageBox.information(new Message(this, { content: 'Mức độ ưu tiên không được để trống' }));
      return false;
    }
    if (!this.duty.categoryId) {
      MessageBox.information(new Message(this, { content: 'Loại công việc không được để trống' }));
      return false;
    }
    return true;
  }

  save(isSaveAndAdd = false) {
    const valid = this.validateBeforeSave();
    if (!valid) {
      if (this.formMode === FormMode.Add) {
        this.saveBtn.isFinished = true;
        this.saveAndAddBtn.isFinished = true;
      } else {
        this.editBtn.isFinished = true;
      }
      return;
    }

    const api = this.formMode === FormMode.Add ? this.dutyService.save("", [this.duty]) : this.dutyService.update("", this.duty);
    if (this.formMode === FormMode.Edit) {
      this.duty.actualDate = DateHelper.getDiffDays(DateHelper.now, this.duty.fromDate);
    }

    api.subscribe(
      response => {
        if (response.success && response.data) {
          const message = this.formMode === FormMode.Add ? 'Thêm công việc thành công' : 'Sửa công việc thành công';
          SnackBar.openSnackBarSuccess(new SnackBarParameter(this, message))
          this.configData.saveSuccess();
          this.configData.closeFn();
        } else {
          MessageBox.information(new Message(this, { content: response.message }));
        }
      },
      err => {
        if (this.formMode === FormMode.Add) {
          this.saveBtn.isFinished = true;
          this.saveAndAddBtn.isFinished = true;
        } else {
          this.editBtn.isFinished = true;
        }
      }
    )
  }

  edit() {
    this.initData();
    this.formMode = FormMode.Edit;
    this.editBtn.isFinished = true;
  }

  updateStatus(isCompleted: boolean, e: any) {
    e.preventDefault();
    this.duty.isCompleted = isCompleted;
    this.duty.actualDate = DateHelper.getDiffDays(DateHelper.now, this.duty.fromDate);
    this.dutyService.update("", this.duty).subscribe(
      response => {
        if (response.success && response.data) {
          SnackBar.openSnackBarSuccess(new SnackBarParameter(this, 'Cập nhật thành công'))
          this.configData.saveSuccess();
        } else {
          MessageBox.information(new Message(this, { content: response.message }));
        }
      }
    )
  }

  confirmDelete() {
    MessageBox.confirmDelete(new Message(this, { content: "Bạn có chắc muốn xóa công việc này?" }, () => {
      this.delete();
    }))
  }

  delete() {
    this.dutyService.delete("", [this.duty.id]).subscribe(response => {
      if (response.success && response.data) {
        SnackBar.openSnackBarSuccess(new SnackBarParameter(this, "Xóa thành công"))
        this.configData.saveSuccess();
        this.configData.closeFn();
      } else {
        MessageBox.information(new Message(this, { content: response.message }));
      }
    })
  }

}
