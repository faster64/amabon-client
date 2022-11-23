import { Injectable } from '@angular/core';
import { File } from '../../models/amazon-file/file/file.model';
import { PaginationRequest } from '../../models/base/pagination-request';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class AmazonFileService extends BaseService {

  constructor(http: HttpService) {
    super(http);
    this.serviceName = "ams";
    this.controller = "folder";
  }

  loadFilesInFolder(folderName: string, paginationRequest: PaginationRequest) {
    const url = `${this.getApiUrl()}/${this.serviceName}/amazon-file/files-in-folder?folderName=${folderName}`;
    return this.takeOriginHttpClient().get<ServiceResult>(url);
  }

  clearCache(folderName: string) {
    const url = `${this.getApiUrl()}/${this.serviceName}/amazon-file/clear-cache?folderName=${folderName}`;
    return this.takeOriginHttpClient().get<ServiceResult>(url);
  }
}
