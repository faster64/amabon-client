import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService {

  constructor(http: HttpService) {
    super(http);
    this.serviceName = "fns";
    this.controller = "payment";
  }
}
