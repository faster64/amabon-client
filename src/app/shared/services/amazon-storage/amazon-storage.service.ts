import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class AmazonStorageService extends BaseService {

  constructor(http: HttpService) {
    super(http);
    this.serviceName = "ams2";
    this.controller = "amazon-storage";
  }
}
