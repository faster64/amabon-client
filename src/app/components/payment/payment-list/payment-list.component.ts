import { Component } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/swt-base-list/base-list.component';
import { GroupBoxFieldType } from 'src/app/shared/enumerations/common.enum';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { PaymentService } from 'src/app/shared/services/payment/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent extends BaseListComponent {

  public readonly serviceName = this.paymentService.serviceName;

  public readonly controller = this.paymentService.controller;

  constructor(
    baseService: BaseService,
    public paymentService: PaymentService,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initDisplayColumn() {
    this.displayColumn = [];
    this.displayColumn.push({ column: 'date', displayText: "Thời gian", width: 120, type: GroupBoxFieldType.Date });
    this.displayColumn.push({ column: 'paymentCategoryName', displayText: 'Loại chi tiêu', width: 160 });
    this.displayColumn.push({ column: 'value', displayText: 'Số tiền', width: 160, type: GroupBoxFieldType.Number });
    this.displayColumn.push({ column: 'reason', displayText: 'Nội dung', width: 320 });
  }
}

