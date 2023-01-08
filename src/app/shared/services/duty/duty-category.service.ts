import { Injectable } from '@angular/core';
import { ServiceResult } from '../../models/base/service-result';
import { DutyCategory } from '../../models/duty/duty-category.model';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class DutyCategoryService extends BaseService {

  constructor(httpService: HttpService) {
    super(httpService);
    this.serviceName = "nts";
    this.controller = "duty-category";
  }

  swapSortOrder(cats: DutyCategory[]) {
    const url = `${this.getApiUrl()}/${this.controller}/swap-sortorder`;
    return this.http.post<ServiceResult>(url, cats);
  }
}
