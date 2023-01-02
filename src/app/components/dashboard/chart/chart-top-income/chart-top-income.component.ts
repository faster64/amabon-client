import { Component, OnInit } from '@angular/core';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { AnalysisService } from 'src/app/shared/services/finance/analysis.service';
import { Utility } from 'src/app/shared/utils/utility';
import { BaseChartComponent } from '../base-chart.component';

@Component({
  selector: 'chart-top-income',
  templateUrl: './chart-top-income.component.html',
  styleUrls: ['./chart-top-income.component.scss']
})
export class ChartTopIncomeComponent extends BaseChartComponent {

  tops: any[] = [];

  topCount = 5;

  totalIncome = 0;

  selectedMonth = DateHelper.currentMonth;

  // title = 'Top thu nhập tháng ' + this.selectedMonth;

  title = 'Top thu nhập';

  constructor(
    baseService: BaseService,
    analysisService: AnalysisService,
  ) {
    super(baseService, analysisService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.customizeLabel = this.customizeLabel.bind(this);
    this.getTopIncome();
  }

  getTopIncome() {
    this.loaded.emit(false);

    const fromDate = new Date(DateHelper.currentYear, this.selectedMonth - 1, 1);
    const toDate = new Date(DateHelper.currentYear, this.selectedMonth, 0);
    this.analysisService.getTopIncomeByTime(DateHelper.formatDate(fromDate), DateHelper.formatDate(toDate), this.topCount).subscribe(
      response => {
        this.loaded.emit(true);
        if (response.success) {
          this.tops = [];
          this.tops = response.data;
          this.totalIncome = this.tops.reduce((total, x) => total + x.value, 0);
        }
      },
      () => this.loaded.emit(true)
    )
  }

  customizeLabel(point: any) {
    let percent = 0;
    if (this.totalIncome) {
      percent = parseFloat(point.value) * 100 / this.totalIncome;
    }

    return `${point.argumentText}: ${new Intl.NumberFormat('en-IN').format(percent)}%`;
  }

  customizeTooltip(point: any) {
    return {
      text: `${Utility.formatCurrency(point.value)}`,
    };
  }

}
