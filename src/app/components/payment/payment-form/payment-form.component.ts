import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseFormComponent } from 'src/app/shared/components/swt-base-form/base-form.component';
import { GroupBoxFieldType } from 'src/app/shared/enumerations/common.enum';
import { GroupBoxField } from 'src/app/shared/models/form-dynamic/group-box-field.model';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { PaymentCategoryService } from 'src/app/shared/services/finance/payment/payment-category.service';
import { PaymentService } from 'src/app/shared/services/finance/payment/payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent extends BaseFormComponent {

  title = {
    view: "",
    add: "",
    edit: ""
  }

  constructor(
    baseService: BaseService,
    activatedRoute: ActivatedRoute,
    public paymentService: PaymentService,
    public paymentCategoryService: PaymentCategoryService,
  ) {
    super(baseService, activatedRoute);
  }

  initData(): void {
    super.initData();
    this.serviceName = this.paymentService.serviceName;
    this.controller = this.paymentService.controller;
  }

  initGroupboxes() {
    const groupBoxFields: GroupBoxField[] = [
      { fieldName: 'value', title: 'Số tiền', value: 0, scale: 4, required: true, type: GroupBoxFieldType.Number },
      { fieldName: 'date', title: 'Ngày chi', value: Date.now(), scale: 4, required: true, type: GroupBoxFieldType.Date },
      {
        fieldName: 'paymentCategoryId',
        title: 'Loại chi tiêu',
        value: 0,
        scale: 4,
        required: true,
        type: GroupBoxFieldType.ComboBox,
        comboboxUrl: `${this.paymentCategoryService.serviceName}/${this.paymentCategoryService.controller}/paging`,
        comboboxMap:  {
          id: "id",
          value: "name"
        }
      },
      { fieldName: 'reason', title: 'Nội dung', value: null, scale: 12, required: true, type: GroupBoxFieldType.TextArea },
    ];
    this.groupBoxes.push({ name: "Thông tin chung", groupBoxFields: groupBoxFields })
  }

}
