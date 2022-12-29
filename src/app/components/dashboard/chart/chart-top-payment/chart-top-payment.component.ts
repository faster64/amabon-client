import { Component } from '@angular/core';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { AnalysisService } from 'src/app/shared/services/finance/analysis.service';
import { Utility } from 'src/app/shared/utils/utility';
import { BaseChartComponent } from '../base-chart.component';

@Component({
  selector: 'chart-top-payment',
  templateUrl: './chart-top-payment.component.html',
  styleUrls: ['./chart-top-payment.component.scss']
})
export class ChartTopPaymentComponent extends BaseChartComponent {

  tops: any[] = [];

  topCount = 5;

  totalPayment = 0;

  selectedMonth = DateHelper.currentMonth;

  title = 'Top chi tiêu tháng ' + this.selectedMonth;

  constructor(
    baseService: BaseService,
    analysisService: AnalysisService,
  ) {
    super(baseService, analysisService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.customizeLabel = this.customizeLabel.bind(this);
    this.getTopPayment();
  }

  getTopPayment() {
    this.loaded.emit(false);

    const fromDate = new Date(DateHelper.currentYear, this.selectedMonth - 1, 1);
    const toDate = new Date(DateHelper.currentYear, this.selectedMonth, 0);
    this.analysisService.getTopPaymentByTime(DateHelper.formatDate(fromDate), DateHelper.formatDate(toDate), this.topCount).subscribe(
      response => {
        this.loaded.emit(true);
        if (response.success) {
          this.tops = [];
          this.tops = response.data;
          this.totalPayment = this.tops.reduce((total, x) => total + x.value, 0);
        }
      },
      () => this.loaded.emit(true)
    )
  }

  customizeLabel(point: any) {
    let percent = 0;
    if (this.totalPayment) {
      percent = parseFloat(point.value) * 100 / this.totalPayment;
    }

    return `${point.argumentText}: ${new Intl.NumberFormat('en-IN').format(percent)}%`;
  }

  customizeTooltip(point: any) {
    return {
      text: `${Utility.formatCurrency(point.value)}`,
    };
  }

}
