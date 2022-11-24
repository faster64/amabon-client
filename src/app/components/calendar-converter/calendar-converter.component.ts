import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import { BaseService } from 'src/app/shared/services/base/base.service';

declare const moment: any;
@Component({
  selector: 'app-calendar-converter',
  templateUrl: './calendar-converter.component.html',
  styleUrls: ['./calendar-converter.component.scss']
})
export class CalendarConverterComponent extends BaseComponent {

  DateHelper = DateHelper;

  solarDate = "";
  lunarDate = "";

  holidays: Holiday[] = [];

  constructor(baseService: BaseService) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initData() {
    this.solarDate = new Date().toLocaleDateString();
    this.lunarDate = moment(new Date()).lunar().format("DD/MM/YYYY");
    this.initHolidays();
    // console.log(DateHelper.getDiffDays(new Date(), new Date("2023-01-22")));
  }

  initHolidays() {
    this.holidays = [];

    const year = this.tetHolidayIsOverToday() ? new Date().getFullYear() + 1 : new Date().getFullYear();
    // Tết Nguyên Đán
    const tetHoliday = moment(new Date(`${year}-01-01`)).solar();
    this.holidays.push({
      name: "Tết Nguyên Đán",
      date: moment(tetHoliday).format("DD/MM/YYYY"),
      diffDays: DateHelper.getDiffDays(tetHoliday._d, new Date())
    });
  }

  private tetHolidayIsOverToday(): boolean {
    const currentYear = new Date().getFullYear();
    const tetHoliday = moment(new Date(`${currentYear}-01-01`)).solar();
    if (DateHelper.compare(new Date(), tetHoliday._d) > 0) {
      return true;
    }
    return false;
  }

}

export interface Holiday {
  name: string;
  date: Date;
  diffDays: number;
}
