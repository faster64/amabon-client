import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListDynamicComponent } from 'src/app/shared/components/swt-list-dynamic/swt-list-dynamic.component';
import { BaseService } from 'src/app/shared/services/base/base.service';

@Component({
  selector: 'payment-list-dynamic',
  templateUrl: './payment-list-dynamic.component.html',
  styleUrls: ['./payment-list-dynamic.component.scss']
})
export class PaymentListDynamicComponent extends ListDynamicComponent {

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
    this.router.navigateByUrl(`/${this.Routing.PAYMENT.path}/category/list`);
  }
}
