import { Injectable } from '@angular/core';
import { BaseMessageResponse } from '../../models/base/base-message-response';
import { PaginationRequest } from '../../models/base/pagination-request';
import { BaseService } from './base.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService extends BaseService {

  serviceName = "";

  // _apiExcelUrl = "";
  get apiExcelUrl() {
    return `${this.getApiUrl()}/${this.serviceName}/excel`;
  }
  constructor(
    http: HttpService
  ) {
    super(http);
  }

  /**
   * Get export key
   */
  public getExportKey(module = "", request: PaginationRequest) {
    const url = `${this.apiExcelUrl}/${module}/get-key`;
    return this.http.post<BaseMessageResponse>(url, request);
  }


  /**
   * Export data theo key
   */
  public getExportUrl(module = "", key: string) {
    return `${this.apiExcelUrl}/${module}/export?key=${key}`;
  }

  /**
   * Get import template key
   */
  public getImportTemplateKey(module = "") {
    const url = `${this.apiExcelUrl}/${module}/get-import-template-key`;
    return this.http.post<BaseMessageResponse>(url, null);
  }

  /**
   * Download import template file
   */
  public downloadImportTemplate(module = "", key: string) {
    return `${this.apiExcelUrl}/${module}/download-template?key=${key}`;
  }

}
