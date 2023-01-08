import { Injectable } from '@angular/core';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class DutyService extends BaseService {

  constructor(httpService: HttpService) {
    super(httpService);
    this.serviceName = "nts";
    this.controller = "duty";
  }

  getDutyByCategoryIds(categoryIds: any[]) {
    const url = `${this.getApiUrl()}/${this.serviceName}/${this.controller}/get-duty-by-categories`;
    return this.http.post<ServiceResult>(url, categoryIds);
  }
}
