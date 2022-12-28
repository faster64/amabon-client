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

  getAnalysisByTime(fromDate: Date, toDate: Date) {
    const url = `${this.getApiUrl()}/${this.serviceName}/${this.controller}/analysis-by-time`;
    return this.http.post<ServiceResult>(url, {
      fromDate: fromDate,
      toDate: toDate,
    });
  }

}
