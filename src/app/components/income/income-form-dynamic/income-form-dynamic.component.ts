import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { FormDynamicComponent } from 'src/app/shared/components/swt-form-dynamic/swt-form-dynamic.component';
import { ErrorMessageConstant } from 'src/app/shared/constants/common.constant';
import { FormMode } from 'src/app/shared/enumerations/common.enum';
import { ServiceResult } from 'src/app/shared/models/base/service-result';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { IncomeService } from 'src/app/shared/services/finance/income/income.service';

@Component({
  selector: 'income-form-dynamic',
  templateUrl: './income-form-dynamic.component.html',
  styleUrls: ['./income-form-dynamic.component.scss']
})
export class IncomeFormDynamicComponent extends FormDynamicComponent {

  constructor(
    baseService: BaseService,
    router: Router,
    activatedRoute: ActivatedRoute,
    public incomeService: IncomeService,
  ) {
    super(baseService, router, activatedRoute);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

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
    this.isSaving = true;
    const data = this.getDynamicData();

    // Nếu có invoices thì đẩy invoices lên trước
    if (data["invoices"] != null) {
      const formData = new FormData();
      (data["invoices"] as Array<File>).forEach(invoice => {
        formData.append("invoices", invoice, invoice.name);
      });
      this.uploadInvoices(formData).pipe(
        switchMap(response => {
          return of(response);
        })
      ).subscribe(
        response => {
          if (response.success) {
            data["invoices"] = response.data.map( (f: any) => f["currentFileName"]);
            this.post(data, isSaveAndAdd);
          } else {
            MessageBox.information(new Message(this, { content: response.message }));
          }
        },
        () => MessageBox.information(new Message(this, { content: ErrorMessageConstant.HAS_ERROR_MESSAGE }))
      );
    } else {
      this.post(data, isSaveAndAdd);
    }
  }

  uploadInvoices(invoices: FormData) {
    return this.incomeService.uploadInvoices(invoices);
  }

  post(data: any, isSaveAndAdd: boolean) {
    const url = `${this.baseService.getApiUrl()}/${this.serviceName}/${this.controller}/${this.formMode === FormMode.Add ? 'save' : 'update'}`;
    // Nếu là sửa thì đính kèm thêm id
    if (this.formMode === FormMode.Edit) {
      (data as any).Id = this.masterId;
    }

    const api = this.formMode === FormMode.Add ? this.baseService._http.post<ServiceResult>(url, [data]) : this.baseService._http.put<ServiceResult>(url, data)

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
}
