import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseMessageResponse } from 'src/app/shared/models/base/base-message-response';
import { environment } from 'src/environments/environment';
import { ServiceResult } from '../../models/base/service-result';
import { UserSetting } from '../../models/setting/setting.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService extends HttpService {

  apiUrl = `${environment.api_url}/setting`;
  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  /**
   * Get setting
   */
  public getSettings() {
    return this.get<ServiceResult>(this.apiUrl);
  }

  /**
   * Update setting
   */
  public updateSetting(setting: UserSetting) {
    if (!setting)
      throw new Error("setting cannot be null");
    const url = `${this.apiUrl}/update-setting`;
    return this.post<BaseMessageResponse>(url, setting);
  }

}
