import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartMonthComponent } from './chart/chart-month/chart-month.component';
import { DxChartModule, DxPieChartModule } from 'devextreme-angular';
import { ChartTopIncomeComponent } from './chart/chart-top-income/chart-top-income.component';
import { ChartTopPaymentComponent } from './chart/chart-top-payment/chart-top-payment.component';


@NgModule({
  declarations: [DashboardComponent, ChartMonthComponent, ChartTopIncomeComponent, ChartTopPaymentComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    DxChartModule,
    DxPieChartModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
