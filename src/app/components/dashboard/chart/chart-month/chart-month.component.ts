import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { AnalysisService } from 'src/app/shared/services/finance/analysis.service';
import { Utility } from 'src/app/shared/utils/utility';

@Component({
  selector: 'chart-month',
  templateUrl: './chart-month.component.html',
  styleUrls: ['./chart-month.component.scss']
})
export class ChartMonthComponent extends BaseComponent {

  months = [];

  selectedMonth = DateHelper.currentMonth;

  @Output()
  loaded = new EventEmitter<boolean>();

  constructor(
    baseService: BaseService,
    public analysisService: AnalysisService,
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getAnalysis();
  }

  getAnalysis() {
    this.loaded.emit(false);

    const fromDate = new Date(DateHelper.currentYear, this.selectedMonth - 1, 1);
    const toDate = new Date(DateHelper.currentYear, this.selectedMonth, 0);
    this.analysisService.getAnalysisByTime(DateHelper.formatDate(fromDate), DateHelper.formatDate(toDate)).subscribe(
      response => {
        this.loaded.emit(true);
        if (response.success && response.data) {
          this.months = response.data.map((x: any) => {
            return {
              day: new Date(x.day).getDate(),
              incomeValue: x.incomeValue,
              paymentValue: x.paymentValue,
            }
          });
        }
      },
      error => this.loaded.emit(true)
    );
  }


  customizeText(arg: any) {
    return arg.valueText;
    // return `${arg.valueText}&#176C`;
  }

  customizeTooltip(arg: any) {
    return {
      text: `${arg.seriesName}: ${Utility.formatCurrency(arg.valueText)}`,
    };
  }
}
