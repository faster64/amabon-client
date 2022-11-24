import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieKey } from '../../constants/cookie.key';
import { CookieHelper } from '../../helpers/cookie.hepler';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(http: HttpService) {
    super(http);
    this.serviceName = "ums";
    this.controller = "user-management";
  }
}
