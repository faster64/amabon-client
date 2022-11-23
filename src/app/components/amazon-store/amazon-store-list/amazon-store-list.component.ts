import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/swt-base-list/base-list.component';
import { SwtGridComponent } from 'src/app/shared/components/swt-grid/swt-grid.component';
import { GroupBoxFieldType } from 'src/app/shared/enumerations/common.enum';
import { BaseService } from 'src/app/shared/services/base/base.service';

@Component({
  selector: 'app-amazon-store-list',
  templateUrl: './amazon-store-list.component.html',
  styleUrls: ['./amazon-store-list.component.scss']
})
export class AmazonStoreListComponent extends BaseListComponent {

  public readonly serviceName = "ams2";

  public readonly controller = "amazon-storage";

  constructor(
    baseService: BaseService,
    cdr: ChangeDetectorRef,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initDisplayColumn() {
    this.displayColumn = [];
    this.displayColumn.push({ column: "createdDate", displayText: "Thời gian", width: 120, type: GroupBoxFieldType.Date });
    this.displayColumn.push({column: 'title', displayText: 'Tiêu đề'});
  }
}
