import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import DataSource from 'devextreme/data/data_source';
import { ButtonColor, IconButtonType } from '../../constants/button.constant';
import { Routing } from '../../constants/common.constant';
import { GroupBoxFieldType, FormMode } from '../../enumerations/common.enum';
import { ServiceResult } from '../../models/base/service-result';
import { GroupBoxField } from '../../models/form-dynamic/group-box-field.model';
import { GroupBox } from '../../models/form-dynamic/group-box.model';
import { Message } from '../../models/message/message';
import { SnackBarParameter } from '../../models/snackbar/snackbar.param';
import { BaseService } from '../../services/base/base.service';
import { BaseComponent } from '../base-component';
import { MessageBox } from '../message-box/message-box.component';
import { SnackBar } from '../snackbar/snackbar.component';
import { SwtButton } from '../swt-button/swt-button.component';

@Component({
  selector: 'form-dynamic',
  templateUrl: './swt-form-dynamic.component.html',
  styleUrls: ['./swt-form-dynamic.component.scss']
})
export class FormDynamicComponent extends BaseComponent {

  FormFieldType = GroupBoxFieldType;

  ButtonColor = ButtonColor;

  IconButtonType = IconButtonType;

  FormMode = FormMode;

  @Input()
  groupBoxes: GroupBox[] = [];

  @Input()
  formMode = FormMode.None;


  @Input()
  serviceName = "";

  @Input()
  controller = "";

  @Input()
  backUrl!: string;

  @Input()
  title: {
    view: string,
    add: string,
    edit: string,
  } = { view: "", add: "", edit: "" }

  @Input()
  saveSuccessMessage = "Lưu thành công";

  @ViewChild("saveBtn")
  saveBtn!: SwtButton;

  @ViewChild("saveAndAddBtn")
  saveAndAddBtn!: SwtButton;

  @ViewChild("saveBtnR")
  saveBtnR!: SwtButton;

  @ViewChild("saveAndAddBtnR")
  saveAndAddBtnR!: SwtButton;

  @ViewChild("deleteBtn")
  deleteBtn!: SwtButton;

  masterId!: number;

  masterData: any;

  isSaving = false;

  isFetching = false;

  constructor(
    baseService: BaseService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initData() {
    if (this.formMode === FormMode.View || this.formMode === FormMode.Edit) {
      this.masterId = parseInt(this.activatedRoute.snapshot.params["id"]);
      this.initDataComboBoxes();
      this.getFormData();
    }
  }

  initDataComboBoxes() {
    this.groupBoxes.forEach(groupBox => {
      var comboBoxes = groupBox.groupBoxFields.filter(field => field.type === GroupBoxFieldType.ComboBox);
      if (comboBoxes && comboBoxes.length) {
        comboBoxes.forEach(comboBox => {
          this.getComboboxData(comboBox);
        })
      }
    })
  }

  /**
   * Lấy dữ liệu form
   */
  getFormData() {
    this.baseService.serviceName = this.serviceName;
    this.baseService.controller = this.controller;
    this.isLoading = true;
    this.baseService.getById("", this.masterId).subscribe(response => {
      this.isLoading = false;
      this.mapData(response.data);
      this.masterData = response.data;
    })
  }

  /**
   * Map dữ liệu từ groupboxes
   */
  mapData(data: any) {
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        this.groupBoxes.forEach(groupBox => {
          const mappingField = groupBox.groupBoxFields.find(f => f.fieldName === key);
          if (mappingField) {
            mappingField.value = data[key];
          }
        })
      });
    }
  }

  /**
   * Save dữ liệu
   */
  save(isSaveAndAdd = false) {
    if (this.isSaving) {
      return;
    }

    const invalid = this.validateBeforeSave();
    if (invalid) {
      MessageBox.information(new Message(this, { content: invalid?.message }));
      this.resetButtons();
      return;
    }

    // Save
    const url = `${this.baseService.getApiUrl()}/${this.serviceName}/${this.controller}/${this.formMode === FormMode.Add ? 'save' : 'update'}`;
    const data = this.getDynamicData();

    // Nếu là sửa thì đính kèm thêm id
    if (this.formMode === FormMode.Edit) {
      (data as any).Id = this.masterId;
    }

    const api = this.formMode === FormMode.Add ? this.baseService._http.post<ServiceResult>(url, [data]) : this.baseService._http.put<ServiceResult>(url, data)

    this.isSaving = true;
    api.subscribe(response => {
      this.isSaving = false;
      this.resetButtons();

      if (response.success) {
        SnackBar.openSnackBarSuccess(new SnackBarParameter(this, this.saveSuccessMessage, "", 1500));

        // Nếu không phải lưu và thêm thì redirect
        if (!isSaveAndAdd) {
          if (this.formMode === FormMode.Add) {
            const viewUrl = (this.activatedRoute.snapshot as any)._routerState.url.replace("/create", "/view");
            const id = response.data;
            this.router.navigate([`${viewUrl}/${id}`]);
          } else {
            const viewUrl = (this.activatedRoute.snapshot as any)._routerState.url.replace("/edit", "/view");
            this.router.navigate([`${viewUrl}`]);
          }
        } else {
          this.resetData();

          if (this.formMode === FormMode.Edit) {
            const index = (this.activatedRoute.snapshot as any)._routerState.url.indexOf('/edit');
            const addUrl = (this.activatedRoute.snapshot as any)._routerState.url.substring(0, index);
            this.router.navigate([`${addUrl}/create`]);
          }
        }

      } else {
        MessageBox.information(new Message(this, { content: response.message }))
      }
    },
      () => { this.resetButtons(); this.isSaving = false; }
    )
  }

  edit() {
    const path = (this.activatedRoute.snapshot as any)._routerState.url;
    const index = (path as string).indexOf('/view');
    const editUrl = `${(path as string).substring(0, index)}/edit/${this.masterId}`;

    this.router.navigate([`${editUrl}`]);
  }

  resetButtons() {
    this.saveBtn.isFinished = true;
    this.saveAndAddBtn.isFinished = true;
    this.saveBtnR.isFinished = true;
    this.saveAndAddBtnR.isFinished = true;
  }

  /**
   * Xác nhận xóa
   */
  confirmDelete() {
    MessageBox.confirmDelete(new Message(this, { content: "Bạn có chắc muốn xóa bản ghi này?" }, () => this.delete()));
    this.deleteBtn.isFinished = true;
  }

  delete() {
    this.baseService.delete("", [this.masterId]).subscribe(response => {
      if (response.success) {
        SnackBar.openSnackBarSuccess(new SnackBarParameter(this, "Xóa thành công"));
        const path = (this.activatedRoute.snapshot as any)._routerState.url;
        const index = (path as string).indexOf('/view');
        const viewUrl = `${(path as string).substring(0, index)}/list`;
        this.router.navigate([`${viewUrl}`]);
      }
    });
  }

  /**
   * Lấy dữ liệu trong form dynamic
   */
  getDynamicData() {
    const dataForm = this.groupBoxes.map(g => g.groupBoxFields);
    const data = this.formMode == FormMode.Edit ? this.masterData : {};
    dataForm.forEach(formFields => {
      formFields.forEach(f => {
        const obj: any = {};
        if (f.type === GroupBoxFieldType.Date) {
          obj[f.fieldName] = new Date(f.value);
        } else {
          obj[f.fieldName] = f.value;
        }
        Object.assign(data, obj);
      })
    });

    return data;
  }

  resetData() {
    this.groupBoxes.forEach(box => {
      box.groupBoxFields.forEach(g => {
        g.value = null;
        if (g.type === GroupBoxFieldType.Date) {
          g.value = new Date();
        }
      });
    });
  }

  back() {
    if (this.backUrl) {
      this.router.navigateByUrl(this.backUrl);
    } else {
      this.router.navigateByUrl(`/${this.controller.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`);
    }
  }
  validateBeforeSave() {
    // Validate required
    const groupBoxFields = this.groupBoxes.map(g => g.groupBoxFields);
    for (let i = 0; i < groupBoxFields.length; i++) {
      const errorField = groupBoxFields[i].find(field => field.required && !field.value);
      if (errorField)
        return {
          fieldName: errorField.fieldName,
          message: `${errorField.title} không được để trống`
        }
    }

    return null;
  }

  getComboboxData(field: GroupBoxField) {
    if (field.pickList && (field.pickList || []).length > 0)
      return;

    const url = `${this.baseService.getApiUrl()}/${field.comboboxUrl}`;
    this.paginationRequest.pageSize = 500;

    this.isFetching = true;
    this.baseService.http.post<ServiceResult>(url, this.paginationRequest).subscribe(
      response => {
        this.isFetching = false;
        if (response.success) {
          field.pickList = response.data.map((item: any) => {
            if (!field.comboboxMap) {
              return {};
            }
            return {
              id: item[field.comboboxMap.id],
              value: item[field.comboboxMap.value],
            }
          });
        }
      },
      () => this.isFetching = false
    )
  }
}
