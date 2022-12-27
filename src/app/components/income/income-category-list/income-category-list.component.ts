import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/components/swt-base-list/base-list.component';
import { GroupBoxFieldType } from 'src/app/shared/enumerations/common.enum';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { IncomeCategoryService } from 'src/app/shared/services/income/income-category.service';

@Component({
  selector: 'app-income-category-list',
  templateUrl: './income-category-list.component.html',
  styleUrls: ['./income-category-list.component.scss']
})
export class IncomeCategoryListComponent extends BaseListComponent {

  public readonly serviceName = this.incomeCategoryService.serviceName;

  public readonly controller = this.incomeCategoryService.controller;

  customizeAddUrl = `/${this.Routing.INCOME.path}/category/create`;

  constructor(
    baseService: BaseService,
    public incomeCategoryService: IncomeCategoryService,
    public router: Router,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initDisplayColumn() {
    this.displayColumn = [];
    this.displayColumn.push({ column: 'createdDate', displayText: "Ngày tạo", width: 120, type: GroupBoxFieldType.Date });
    this.displayColumn.push({ column: 'name', displayText: 'Loại thu nhập', width: 160 });
  }

  customizeViewFunc(e: any) {
    this.router.navigateByUrl(`/${this.Routing.INCOME.path}/category/view/${e.id}`)
  }
}
