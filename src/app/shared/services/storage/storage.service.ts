import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  uploadCount = 0;

  constructor(http: HttpService) {
    super(http);
    this.serviceName = "ass";
    this.controller = "folder";
  }

  /**
   * override
   */
  getAll(customUrl = ""): Observable<ServiceResult> {
    const url = customUrl ? customUrl : `${this.getApiUrl()}/${this.serviceName}/${this.controller}/get-all`;
    return this.takeOriginHttpClient().get<ServiceResult>(url, {
      headers: {
        "X-Secret-Key": CookieHelper.getCookie(`${environment.team}_${SessionStorageKey.SECRET_KEY}`) || ""
      }
    });
  }

  getFolderByName(folderName: string) {
    const url = `${this.getApiUrl()}/${this.serviceName}/folder/get-folder-by-name?folderName=${folderName}`;
    return this.takeOriginHttpClient().get<ServiceResult>(url);
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

  moveFiles(src: any, des: any, fileNames: string[]) {
    const url = `${this.getApiUrl()}/${this.serviceName}/storage/move?src=${src}&des=${des}`;
    return this.takeOriginHttpClient().post<ServiceResult>(url, fileNames, {
      headers: {
        "X-Secret-Key": CookieHelper.getCookie(`${environment.team}_${SessionStorageKey.SECRET_KEY}`) || ""
      },
    });
  }

  deleteFiles(folderName: string, fileNames: string[]) {
    const url = `${this.getApiUrl()}/${this.serviceName}/storage/delete-files?folderName=${folderName}`;
    return this.takeOriginHttpClient().request<ServiceResult>("delete", url, {
      headers: {
        "X-Secret-Key": CookieHelper.getCookie(`${environment.team}_${SessionStorageKey.SECRET_KEY}`) || ""
      },
      body: fileNames
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

  save(customUrl: string | undefined, entities: any[]): Observable<ServiceResult> {
    const url = `${this.getApiUrl()}/${this.serviceName}/${this.controller}/save`;
    return this.takeOriginHttpClient().post<ServiceResult>(url, entities, {
      headers: {
        "X-Secret-Key": CookieHelper.getCookie(`${environment.team}_${SessionStorageKey.SECRET_KEY}`) || ""
      }
    });
  };
}
