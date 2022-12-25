import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseFormComponent } from 'src/app/shared/components/swt-base-form/base-form.component';
import { GroupBoxFieldType } from 'src/app/shared/enumerations/common.enum';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { IncomeService } from 'src/app/shared/services/income/income.service';
import { GroupBoxField } from '../../../shared/models/form-dynamic/group-box-field.model';


@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss']
})
export class IncomeFormComponent extends BaseFormComponent {

  title = {
    view: "",
    add: "",
    edit: ""
  }

  constructor(
    baseService: BaseService,
    activatedRoute: ActivatedRoute,
    public incomeService: IncomeService
  ) {
    super(baseService, activatedRoute);
  }

  initData(): void {
    super.initData();
    this.serviceName = this.incomeService.serviceName;
    this.controller = this.incomeService.controller;
  }

  initGroupboxes() {
    const groupBoxFields: GroupBoxField[] = [
      { fieldName: 'value', title: 'Số tiền', value: 0, scale: 6, required: true, type: GroupBoxFieldType.Number },
      { fieldName: 'date', title: 'Ngày thu', value: Date.now(), scale: 6, required: true, type: GroupBoxFieldType.Date },
      // { fieldName: 'incomeCategory', title: 'Loại thu nhập', value: 0, scale: 6, required: true, type: GroupBoxFieldType.ComboBox },
      { fieldName: 'reason', title: 'Nội dung', value: null, scale: 12, required: true, type: GroupBoxFieldType.TextArea },
    ];
    this.groupBoxes.push({ name: "Thông tin chung", groupBoxFields: groupBoxFields })
  }

}
