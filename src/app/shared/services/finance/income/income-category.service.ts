import { Injectable } from '@angular/core';
import { BaseService } from '../../base/base.service';
import { HttpService } from '../../base/http.service';
import { FinanceService } from '../finance.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeCategoryService extends FinanceService {

  constructor(http: HttpService) {
    super(http);
    this.controller = "incomeCategory";
  }
}
