import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionStorageKey } from '../../constants/sessionstorage.key';
import { CookieHelper } from '../../helpers/cookie.hepler';
import { PaginationRequest } from '../../models/base/pagination-request';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService extends BaseService {

  constructor(http: HttpService) {
    super(http);
    this.serviceName = "ass";
    this.controller = "folder";
  }

  loadFilesInFolder(folderName: string) {
    const url = `${this.getApiUrl()}/${this.serviceName}/storage/files-in-folder?folderName=${folderName}`;
    return this.takeOriginHttpClient().get<ServiceResult>(url, {
      headers: {
        "X-Secret-Key": CookieHelper.getCookie(`${environment.team}_${SessionStorageKey.SECRET_KEY}`) || ""
      }
    });
  }

  loadFilesPaging(folderName: string, paginationRequest: PaginationRequest) {
    const url = `${this.getApiUrl()}/${this.serviceName}/storage/files-paging?folderName=${folderName}`;
    return this.takeOriginHttpClient().post<ServiceResult>(url, paginationRequest, {
      headers: {
        "X-Secret-Key": CookieHelper.getCookie(`${environment.team}_${SessionStorageKey.SECRET_KEY}`) || ""
      }
    });
  }

  clearCache(folderName: string) {
    const url = `${this.getApiUrl()}/${this.serviceName}/storage/clear-cache?folderName=${folderName}`;
    return this.takeOriginHttpClient().get<ServiceResult>(url, {
      headers: {
        "X-Secret-Key": CookieHelper.getCookie(`${environment.team}_${SessionStorageKey.SECRET_KEY}`) || ""
      }
    });
  }
}
