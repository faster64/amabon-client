import { Injectable } from '@angular/core';
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
    return this.takeOriginHttpClient().get<ServiceResult>(url);
  }

  loadFilesPaging(folderName: string, paginationRequest: PaginationRequest) {
    const url = `${this.getApiUrl()}/${this.serviceName}/storage/files-paging?folderName=${folderName}`;
    return this.takeOriginHttpClient().post<ServiceResult>(url, paginationRequest);
  }

  clearCache(folderName: string) {
    const url = `${this.getApiUrl()}/${this.serviceName}/storage/clear-cache?folderName=${folderName}`;
    return this.takeOriginHttpClient().get<ServiceResult>(url);
  }
}
