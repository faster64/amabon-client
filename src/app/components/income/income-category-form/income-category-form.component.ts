import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseFormComponent } from 'src/app/shared/components/swt-base-form/base-form.component';
import { GroupBoxFieldType } from 'src/app/shared/enumerations/common.enum';
import { GroupBoxField } from 'src/app/shared/models/form-dynamic/group-box-field.model';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { IncomeCategoryService } from 'src/app/shared/services/income/income-category.service';

@Component({
  selector: 'app-income-category-form',
  templateUrl: './income-category-form.component.html',
  styleUrls: ['./income-category-form.component.scss']
})
export class IncomeCategoryFormComponent extends BaseFormComponent {

  title = {
    view: "",
    add: "",
    edit: ""
  }

  backUrl = `/${this.Routing.INCOME.path}/category`;

  constructor(
    baseService: BaseService,
    activatedRoute: ActivatedRoute,
    public incomeCategoryService: IncomeCategoryService,
  ) {
    super(baseService, activatedRoute);
  }

  initData(): void {
    super.initData();
    this.serviceName = this.incomeCategoryService.serviceName;
    this.controller = this.incomeCategoryService.controller;
  }

  initGroupboxes() {
    const groupBoxFields: GroupBoxField[] = [
      { fieldName: 'name', title: 'Loại thu nhập', value: '', scale: 12, required: true },
    ];
    this.groupBoxes.push({ name: "Thông tin chung", groupBoxFields: groupBoxFields })
  }

}

