import { Injectable } from '@angular/core';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService extends BaseService {

  constructor(http: HttpService) {
    super(http);
    this.serviceName = "fns";
    this.controller = "analysis";
  }

  getAnalysisByTime(fromDate: string, toDate: string) {
    const url = `${this.getApiUrl()}/${this.serviceName}/${this.controller}/analysis-by-time?fromDate=${fromDate}&toDate=${toDate}`;
    return this.http.post<ServiceResult>(url, {
      fromDate: fromDate,
      toDate: toDate,
    });
  }

  getTopPaymentByTime(fromDate: string, toDate: string, topCount: number) {
    const url = `${this.getApiUrl()}/${this.serviceName}/${this.controller}/top-payment-by-time?fromDate=${fromDate}&toDate=${toDate}&topCount=${topCount}`;
    return this.http.post<ServiceResult>(url, {
      fromDate: fromDate,
      toDate: toDate,
    });
  }

  getTopIncomeByTime(fromDate: string, toDate: string, topCount: number) {
    const url = `${this.getApiUrl()}/${this.serviceName}/${this.controller}/top-income-by-time?fromDate=${fromDate}&toDate=${toDate}&topCount=${topCount}`;
    return this.http.post<ServiceResult>(url, {
      fromDate: fromDate,
      toDate: toDate,
    });
  }
}
