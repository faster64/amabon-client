import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseFormComponent } from 'src/app/shared/components/swt-base-form/base-form.component';
import { GroupBoxField } from 'src/app/shared/models/form-dynamic/group-box-field.model';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { PaymentCategoryService } from 'src/app/shared/services/finance/payment/payment-category.service';

@Component({
  selector: 'app-payment-category-form',
  templateUrl: './payment-category-form.component.html',
  styleUrls: ['./payment-category-form.component.scss']
})
export class PaymentCategoryFormComponent extends BaseFormComponent {

  title = {
    view: "",
    add: "",
    edit: ""
  }

  backUrl = `/${this.Routing.PAYMENT.path}/category`;

  constructor(
    baseService: BaseService,
    activatedRoute: ActivatedRoute,
    public paymentCategoryService: PaymentCategoryService,
  ) {
    super(baseService, activatedRoute);
  }

  initData(): void {
    super.initData();
    this.serviceName = this.paymentCategoryService.serviceName;
    this.controller = this.paymentCategoryService.controller;
  }

  initGroupboxes() {
    const groupBoxFields: GroupBoxField[] = [
      { fieldName: 'name', title: 'Loại chi tiêu', value: '', scale: 12, required: true },
    ];
    this.groupBoxes.push({ name: "Thông tin chung", groupBoxFields: groupBoxFields })
  }

}
