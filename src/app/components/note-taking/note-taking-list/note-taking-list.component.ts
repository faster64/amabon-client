import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/swt-base-list/base-list.component';
import { GroupBoxFieldType } from 'src/app/shared/enumerations/common.enum';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { NoteTakingService } from 'src/app/shared/services/note-taking/note-taking.service';

@Component({
  selector: 'app-note-taking-list',
  templateUrl: './note-taking-list.component.html',
  styleUrls: ['./note-taking-list.component.scss']
})
export class NoteTakingListComponent extends BaseListComponent {

  public readonly serviceName = this.noteTakingService.serviceName;

  public readonly controller = this.noteTakingService.controller;

  constructor(
    baseService: BaseService,
    cdr: ChangeDetectorRef,
    public noteTakingService: NoteTakingService,
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
