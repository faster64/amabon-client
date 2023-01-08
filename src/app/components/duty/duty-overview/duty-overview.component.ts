import { Component, ViewChild } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DxScrollViewComponent, DxTextBoxComponent } from 'devextreme-angular';
import { switchMap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { BreakPoint } from 'src/app/shared/constants/break-point.constant';
import { DutyStatus, FormMode, Priority } from 'src/app/shared/enumerations/common.enum';
import { ColorHelper } from 'src/app/shared/helpers/color.helper';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { ServiceResult } from 'src/app/shared/models/base/service-result';
import { DutyCategory } from 'src/app/shared/models/duty/duty-category.model';
import { Duty } from 'src/app/shared/models/duty/duty.model';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { DutyCategoryService } from 'src/app/shared/services/duty/duty-category.service';
import { DutyService } from 'src/app/shared/services/duty/duty.service';
import { DutyDetailComponent } from '../duty-detail/duty-detail.component';

@Component({
  selector: 'app-duty-overview',
  templateUrl: './duty-overview.component.html',
  styleUrls: ['./duty-overview.component.scss']
})
export class DutyOverviewComponent extends BaseComponent {

  FormMode = FormMode;

  @ViewChild("rootView")
  rootView!: DxScrollViewComponent;

  @ViewChild("addCategoryBox")
  addCategoryBox!: DxTextBoxComponent;

  @ViewChild("editCategoryBox")
  editCategoryBox!: DxTextBoxComponent;

  dutyCategories: DutyUI[] = [];

  employees: any = {};

  statuses: any[] = [];

  duties: Duty[] = [];

  device = "web";

  onAddCategory = false;

  onSavingCategory = false;

  editInstance: any = {
    id: 0,
    categoryName: ""
  };

  // maxLoadingColumn = 0;

  detailDialog!: MatDialogRef<DutyDetailComponent>;

  constructor(
    baseService: BaseService,
    public dutyService: DutyService,
    public dutyCategoryService: DutyCategoryService,
    public dialog: MatDialog,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initData() {
    // this.onLoading();
    this.isLoading = true;
    this.dutyCategoryService.getAll().pipe(
      switchMap(response => {
        if (response.success && response.data) {
          // Sort lại cate
          response.data = response.data.sort((a: DutyCategory, b: DutyCategory) => a.sortOrder - b.sortOrder)

          this.dutyCategories = [];
          response.data.forEach((r: any) => {
            this.dutyCategories.push(Object.assign(new DutyUI(), r))
          });

          this.statuses = this.dutyCategories.map(cate => cate.categoryName);
        }

        return this.getDutyByCategoryIds([...new Set(this.dutyCategories.map(cate => cate.id))])
      })
    ).subscribe(
      response => this.handleAfterGetDuties(response),
      err => this.isLoading = false
    );

    this.guessDevice();
  }

  guessDevice() {
    const screenWidth = screen.width;
    if (screenWidth <= BreakPoint.SM) {
      this.device = "mobile";
    } else {
      this.device = "web";
    }
  }

  // onLoading() {
  //   const screenWidth = screen.width;
  //   this.maxLoadingColumn = Math.ceil(screenWidth / 320);
  // }

  getDutyByCategoryIds(categoryIds: number[]) {
    return this.dutyService.getDutyByCategoryIds(categoryIds);
  }

  handleAfterGetDuties(response: ServiceResult) {
    if (response.success && response.data) {
      this.duties = response.data;
      this.dutyCategories.forEach((category) => {
        category.duties = [];
        const dutyCate = this.duties.filter(duty => duty.categoryId === category.id);
        dutyCate.forEach(duty => {
          category["duties"].push({
            ...duty,
            status: this.getStatus(duty),
            statusText: this.getStatusText(this.getStatus(duty)),
            priorityText: this.getPriorityText(duty),
          });
        })
      });
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }
  }

  onCategoryReorder(e: any) {
    const list = this.dutyCategories.splice(e.fromIndex, 1)[0];
    this.dutyCategories.splice(e.toIndex, 0, list);

    const status = this.statuses.splice(e.fromIndex, 1)[0];
    this.statuses.splice(e.toIndex, 0, status);

    if (e.fromIndex === e.toIndex)
      return;

    this.dutyCategoryService.swapSortOrder(this.dutyCategories).subscribe(response => {
      if (response.success && response.data) {
        SnackBar.openSnackBarSuccess(new SnackBarParameter(this, "Cập nhật thành công", "", 1500));
      } else {
        MessageBox.information(new Message(this, { content: response.message }));
      }
    })
  }

  onTaskDragStart(e: any) {
    e.itemData = e.fromData["duties"][e.fromIndex];
  }

  onTaskDrop(e: any) {
    e.fromData["duties"].splice(e.fromIndex, 1);
    e.toData["duties"].splice(e.toIndex, 0, e.itemData);

    const entity = e.itemData as Duty;
    if (entity.categoryId === (e.toData as DutyCategory).id)
      return;

    entity.categoryId = (e.toData as DutyCategory).id;
    this.dutyService.update("", entity).subscribe(response => {
      if (response.success && response.data) {
        SnackBar.openSnackBarSuccess(new SnackBarParameter(this, "Cập nhật thành công", "", 1500));
      } else {
        MessageBox.information(new Message(this, { content: response.message }));
      }
    })
  }

  prepareConfig() {
    const config = new MatDialogConfig();
    const position: DialogPosition = {};
    position.top = '100px';

    config.maxWidth = '90%';
    config.maxHeight = `${window.innerHeight * 0.8}px`;
    config.position = position;

    const currentScreenWidth = window.innerWidth;
    if (currentScreenWidth < BreakPoint.SM) {
      config.width = `${window.innerWidth * 0.9}px`;
    } else if (currentScreenWidth >= BreakPoint.SM && currentScreenWidth < BreakPoint.MD) {
      config.width = '440px';
    } else {
      config.width = '640px';
    }
    config.data = {
      closeFn: () => this.detailDialog.close(),
      saveSuccess: () => {
        this.isLoading = true;
        this.getDutyByCategoryIds([...new Set(this.dutyCategories.map(cate => cate.id))]).subscribe(
          response => this.handleAfterGetDuties(response),
          err => this.isLoading = false
        );
      }
    }
    return config;
  }

  openPopupCreateDuty(e: any, mode: FormMode) {
    setTimeout(() => {
      const config = this.prepareConfig();
      config.data["formMode"] = mode;
      if (mode == FormMode.Add) {
        config.data["categoryId"] = e.id;
      } else {
        config.data["categoryId"] = e.categoryId;
        config.data["duty"] = e;
      }
      this.detailDialog = this.dialog.open(DutyDetailComponent, config);
    }, 100);
  }

  scrollToLeft(e: any) {
    const left = this.rootView.instance.scrollLeft();
    const top = this.rootView.instance.scrollTop();

    this.rootView.instance.scrollTo({
      left: left - 100,
      top: top
    });
  }

  holdId: any;
  scrollTo(orientation: string) {
    this.holdId = setInterval(() => {
      const left = this.rootView.instance.scrollLeft();
      const top = this.rootView.instance.scrollTop();

      let value = 50;
      if (orientation === 'left') {
        value = - value;
      }
      this.rootView.instance.scrollTo({
        left: left + value,
        top: top
      });
    }, 50)
  }

  stopHold() {
    clearInterval(this.holdId);
  }

  focusCategoryBox() {
    this.onAddCategory = true;
    setTimeout(() => {
      this.addCategoryBox.instance.focus();
    }, 100);
  }

  saveCategory(e: any) {
    const value = this.addCategoryBox.value;
    if (StringHelper.isNullOrEmpty(value)) {
      this.onAddCategory = false;
      return;
    }

    this.onSavingCategory = true;
    const category = new DutyCategory();
    category.categoryName = value;
    category.colorCode = ColorHelper.getRandomColorCode();

    const sortOrders = [...this.dutyCategories.map(item => item.sortOrder)];
    if (sortOrders.length == 0) {
      category.sortOrder = 1;
    } else {
      category.sortOrder = Math.max(...sortOrders) + 1;
    }

    this.dutyCategoryService.save("", [category]).subscribe(
      response => {
        this.onSavingCategory = false;
        if (response.success && response.data) {
          SnackBar.openSnackBarSuccess(new SnackBarParameter(this, "Tạo nhóm công việc thành công"));
          this.initData();
          this.onAddCategory = false;
        } else {
          MessageBox.information(new Message(this, {content: response.message}));
        }
      },
      err => this.onSavingCategory = false
    )
  }

  getStatus(duty: Duty) {
    if (DateHelper.compare(DateHelper.now, new Date(duty.toDate)) > 0) {
      if (duty.isCompleted === false)
        return DutyStatus.Overdue;

      if (duty.actualDate > DateHelper.getDiffDays(new Date(duty.fromDate), new Date(duty.toDate)))
        return DutyStatus.Overdue;

      return DutyStatus.Done;
    } else {
      if (duty.isCompleted)
        return DutyStatus.Done;
      return DutyStatus.Processing;
    }
  }

  getStatusText(status: DutyStatus) {
    if (status === DutyStatus.Processing)
      return "Đang thực hiện";

    if (status === DutyStatus.Done)
      return "Hoàn thành";

    return "Quá hạn";
  }

  getPriorityText(duty: Duty) {
    if (duty.priority === Priority.Urgent)
      return "Khẩn cấp";

    if (duty.priority === Priority.Important)
      return "Quan trọng";

    if (duty.priority === Priority.High)
      return "Cao";

    if (duty.priority === Priority.Medium)
      return "Vừa";

    return "Thấp";
  }

  confirmDelete(category: any) {
    MessageBox.confirmDelete(new Message(this, { content: "Các công việc trong nhóm này cũng sẽ bị xóa. Bạn có chắc chắn không?" }, () => {
      this.delete(category);
    }))
  }

  delete(category: any) {
    this.dutyCategoryService.delete("", [category.id]).subscribe(response => {
      if (response.success && response.data) {
        SnackBar.openSnackBarSuccess(new SnackBarParameter(this, "Xóa thành công"))
        this.initData();
      } else {
        MessageBox.information(new Message(this, { content: response.message }));
      }
    })
  }

  editDutyCategory(category: any) {
    this.editInstance = category;
    setTimeout(() => {
      this.editCategoryBox.instance.focus();
    }, 100);
  }

  updateCategory(e: any) {
    this.dutyCategoryService.update("", this.editInstance).subscribe(response => {
      if (response.success && response.data) {
        this.editInstance = new DutyCategory();
        SnackBar.openSnackBarSuccess(new SnackBarParameter(this, "Cập nhật thành công", "", 1500));
      } else {
        MessageBox.information(new Message(this, { content: response.message }));
      }
    })
  }

}

export class DutyUI extends DutyCategory {
  public duties: any[] = [];
}
