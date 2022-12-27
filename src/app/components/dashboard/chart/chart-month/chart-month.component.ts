import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseService } from 'src/app/shared/services/base/base.service';
import { Utility } from 'src/app/shared/utils/utility';

@Component({
  selector: 'chart-month',
  templateUrl: './chart-month.component.html',
  styleUrls: ['./chart-month.component.scss']
})
export class ChartMonthComponent extends BaseComponent {

  monthWeather = [
    { "day": "1", "incomeValue": 11, "paymentValue": 11000000 },
    { "day": "2", "incomeValue": 7 },
    { "day": "3", "incomeValue": 6 },
    { "day": "4", "incomeValue": 8 },
    { "day": "5", "incomeValue": 7 },
    { "day": "6", "incomeValue": 7 },
    { "day": "7", "incomeValue": 11 },
    { "day": "8", "incomeValue": 9 },
    { "day": "9", "incomeValue": 5 },
    { "day": "10", "t": 8 },
    { "day": "11", "t": 6 },
    { "day": "12", "t": 9 },
    { "day": "13", "t": 8 },
    { "day": "14", "t": 6 },
    { "day": "15", "t": 6 },
    { "day": "16", "t": 6 },
    { "day": "17", "t": 10 },
    { "day": "18", "t": 9 },
    { "day": "19", "t": 12 },
    { "day": "20", "t": 9 },
    { "day": "21", "t": 8 },
    { "day": "22", "t": 13 },
    { "day": "23", "t": 9 },
    { "day": "24", "t": 7 },
    { "day": "25", "t": 6 },
    { "day": "26", "t": 11 },
    { "day": "27", "t": 8 },
    { "day": "28", "t": 7 },
    { "day": "29", "t": 9 },
    { "day": "30", "t": 7 },
    { "day": "31", "t": 3 }
  ];

  constructor(
    baseService: BaseService,
  ) {
    super(baseService);
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
