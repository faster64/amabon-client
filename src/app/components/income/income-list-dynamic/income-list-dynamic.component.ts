import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListDynamicComponent } from 'src/app/shared/components/swt-list-dynamic/swt-list-dynamic.component';
import { PaginationRequest } from 'src/app/shared/models/base/pagination-request';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { IncomeService } from 'src/app/shared/services/finance/income/income.service';

@Component({
  selector: 'income-list-dynamic',
  templateUrl: './income-list-dynamic.component.html',
  styleUrls: ['./income-list-dynamic.component.scss']
})
export class IncomeListDynamicComponent extends ListDynamicComponent {

  loadingTotal = true;

  totalValue = 0;

  accountBalance = 0;

  constructor(
    baseService: BaseService,
    router: Router,
    dialog: MatDialog,
    ngZone: NgZone,
    cdr: ChangeDetectorRef,
    public incomeService: IncomeService,
  ) {
    super(baseService, router, dialog, ngZone, cdr);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getTotalIncome();
    this.getAccountBalance();
  }

  toCategory() {
    this.router.navigateByUrl(`/${this.Routing.INCOME.path}/category/list`);
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
      this.getTotalIncome();
      this.getAccountBalance();
    }
  }

  getTotalIncome() {
    this.loadingTotal = true;
    this.incomeService.getTotal().subscribe(
      response => {
        this.loadingTotal = false;
        if (response.success) {
          this.totalValue = response.data;
        }
      },
      error => this.loadingTotal = false
    )
  }

  getAccountBalance() {
    this.incomeService.getAccountBalance().subscribe(
      response => {
        if (response.success) {
          this.accountBalance = response.data;
        }
      }
    )
  }
}
