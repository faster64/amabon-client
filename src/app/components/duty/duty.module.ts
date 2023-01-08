import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DutyRoutingModule } from './duty-routing.module';
import { DxCheckBoxModule, DxDateBoxModule, DxNumberBoxModule, DxScrollViewModule, DxSelectBoxModule, DxSortableModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { DutyOverviewComponent } from './duty-overview/duty-overview.component';
import { DutyDetailComponent } from './duty-detail/duty-detail.component';


@NgModule({
  declarations: [DutyOverviewComponent, DutyDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    DutyRoutingModule,
    DxScrollViewModule,
    DxSortableModule,
    MatTooltipModule,
    SwtButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    MatDialogModule,
    DragDropModule,
    MatMenuModule,
  ],
  exports: [DutyOverviewComponent, DutyDetailComponent]
})
export class DutyModule { }
