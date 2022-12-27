import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartMonthComponent } from './chart/chart-month/chart-month.component';
import { DxChartModule } from 'devextreme-angular';


@NgModule({
  declarations: [DashboardComponent, ChartMonthComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    DxChartModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
