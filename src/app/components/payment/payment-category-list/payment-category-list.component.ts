import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/components/swt-base-list/base-list.component';
import { GroupBoxFieldType } from 'src/app/shared/enumerations/common.enum';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { PaymentCategoryService } from 'src/app/shared/services/payment/payment-category.service';

@Component({
  selector: 'app-payment-category-list',
  templateUrl: './payment-category-list.component.html',
  styleUrls: ['./payment-category-list.component.scss']
})
export class PaymentCategoryListComponent extends BaseListComponent {

  public readonly serviceName = this.paymentCategoryService.serviceName;

  public readonly controller = this.paymentCategoryService.controller;

  customizeAddUrl = `/${this.Routing.PAYMENT.path}/category/create`;

  constructor(
    baseService: BaseService,
    public paymentCategoryService: PaymentCategoryService,
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
    this.displayColumn.push({ column: 'name', displayText: 'Loại chi tiêu', width: 160 });
  }

  customizeViewFunc(e: any) {
    this.router.navigateByUrl(`/${this.Routing.PAYMENT.path}/category/view/${e.id}`)
  }
}

