import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseListComponent } from 'src/app/shared/components/swt-base-list/base-list.component';
import { GroupBoxFieldType } from 'src/app/shared/enumerations/common.enum';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { IncomeService } from 'src/app/shared/services/income/income.service';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.scss']
})
export class IncomeListComponent extends BaseListComponent {

  public readonly serviceName = this.incomeService.serviceName;

  public readonly controller = this.incomeService.controller;

  constructor(
    baseService: BaseService,
    public incomeService: IncomeService,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initDisplayColumn() {
    this.displayColumn = [];
    this.displayColumn.push({ column: "date", displayText: "Thời gian", width: 120, type: GroupBoxFieldType.Date });
    this.displayColumn.push({column: 'incomeCategoryName', displayText: 'Loại thu nhập', width: 160});
    this.displayColumn.push({column: 'value', displayText: 'Số tiền', width: 160, type: GroupBoxFieldType.Number});
    this.displayColumn.push({column: 'reason', displayText: 'Nội dung', width: 320});
  }
}
