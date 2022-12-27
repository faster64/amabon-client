import { Injectable } from '@angular/core';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceService extends BaseService {

  constructor(http: HttpService) {
    super(http);
    this.serviceName = "fns";
  }

  getTotal() {
    const url = `${this.getApiUrl()}/${this.serviceName}/${this.controller}/total`;
    return this.http.get<ServiceResult>(url);
  }

  getAccountBalance() {
    const url = `${this.getApiUrl()}/${this.serviceName}/${this.controller}/account-balance`;
    return this.http.get<ServiceResult>(url);
  }
}
