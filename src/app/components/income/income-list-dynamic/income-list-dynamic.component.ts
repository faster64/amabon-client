import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListDynamicComponent } from 'src/app/shared/components/swt-list-dynamic/swt-list-dynamic.component';
import { BaseService } from 'src/app/shared/services/base/base.service';

@Component({
  selector: 'income-list-dynamic',
  templateUrl: './income-list-dynamic.component.html',
  styleUrls: ['./income-list-dynamic.component.scss']
})
export class IncomeListDynamicComponent extends ListDynamicComponent {

  constructor(
    baseService: BaseService,
    router: Router,
    dialog: MatDialog,
    ngZone: NgZone,
    cdr: ChangeDetectorRef
  ) {
    super(baseService, router, dialog, ngZone, cdr);
  }

  toCategory() {
    this.router.navigateByUrl(`/${this.Routing.INCOME.path}/category/list`);
  }
}
