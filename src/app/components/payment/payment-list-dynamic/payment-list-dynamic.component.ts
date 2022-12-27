import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListDynamicComponent } from 'src/app/shared/components/swt-list-dynamic/swt-list-dynamic.component';
import { PaginationRequest } from 'src/app/shared/models/base/pagination-request';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { PaymentService } from 'src/app/shared/services/finance/payment/payment.service';

@Component({
  selector: 'payment-list-dynamic',
  templateUrl: './payment-list-dynamic.component.html',
  styleUrls: ['./payment-list-dynamic.component.scss']
})
export class PaymentListDynamicComponent extends ListDynamicComponent {

  loadingTotal = true;

  totalValue = 0;

  constructor(
    baseService: BaseService,
    router: Router,
    dialog: MatDialog,
    ngZone: NgZone,
    cdr: ChangeDetectorRef,
    public paymentService: PaymentService,
  ) {
    super(baseService, router, dialog, ngZone, cdr);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getTotalPayment();
  }

  toCategory() {
    this.router.navigateByUrl(`/${this.Routing.PAYMENT.path}/category/list`);
  }

  reload(): void {
    if(!this.isLoading) {
      this.paginationRequest = new PaginationRequest();
      this.data = [];
      this.current = 0;
      this.total = 0;
      this.isFirstLoad = true;
      this.grid.changeAllCheckBox(false);
      this.grid.table.nativeElement.scrollTop = 0; // reset scroll position
      this.getDataGrid();
      this.getTotalPayment();
    }
  }

  getTotalPayment() {
    this.loadingTotal = true;
    this.paymentService.getTotal().subscribe(
      response => {
        this.loadingTotal = false;
        if (response.success) {
          this.totalValue = response.data;
        }
      },
      error => this.loadingTotal = false
    )
  }
}
