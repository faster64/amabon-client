import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { PaginationRequest } from '../../models/base/pagination-request';
import { ServiceResult } from '../../models/base/service-result';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private apiUrl = environment.api_url;

  serviceName = "";

  controller = "";

  _http!: HttpService;

  constructor(
    public http: HttpService
  ) {
    this._http = http;
  }

  takeOriginHttpClient() {
    return this._http.http;
  }

  /**
   * get api url
   */
  getApiUrl() {
    return this.apiUrl;
  }

  /**
   * Get by id
   */
  getById(customUrl = "", id: any) {
    const url = customUrl ? customUrl : `${this.apiUrl}/${this.serviceName}/${this.controller}/get?id=${id}`;
    return this.http.get<ServiceResult>(url);
  }

  /**
   * Get all
   */
  getAll(customUrl = ""): Observable<ServiceResult> {
    const url = customUrl ? customUrl : `${this.apiUrl}/${this.serviceName}/${this.controller}/get-all`;
    return this.http.get<ServiceResult>(url);
  }

  /**
   * Lấy dữ liệu paging
   */
  getPaging(customUrl = "", paginationRequest: PaginationRequest): Observable<ServiceResult> {
    if (paginationRequest == null) {
      throw new Error(`Parameter paginationRequest cannot be null`);
    }

    const url = customUrl ? customUrl : `${this.apiUrl}/${this.serviceName}/${this.controller}/paging`;
    return this.http.post<ServiceResult>(url, paginationRequest);
  }

  update(customUrl = "", entity: any) {
    if (!entity) {
      throw new Error(`Entity cannot be null`);
    }

    const url = customUrl ? customUrl : `${this.apiUrl}/${this.serviceName}/${this.controller}/update`;
    return this.http.put<ServiceResult>(url, entity);
  }

  delete(customUrl = "", ids: any[]) {
    if (!ids || ids.length == 0)
      throw new Error("param cannot be null");

    const url = customUrl ? customUrl : `${this.apiUrl}/${this.serviceName}/${this.controller}/delete`;
    return this.http.delete<ServiceResult>(url, ids.map(id => id + ""));
  }

  /**
   * Find by fields
   */
  findByFields(customUrl = "", paginationRequest: PaginationRequest) {
    if (paginationRequest == null) {
      throw new Error(`Parameter paginationRequest cannot be null`);
    }

    const url = customUrl ? customUrl : `${this.apiUrl}/${this.serviceName}/${this.controller}/find-by-fields`;
    return this.http.post<ServiceResult>(url, paginationRequest);
  }


  /**
   * Save
   */
  save(customUrl: string = "", entities: any[]) {
    const url = customUrl ? customUrl : `${this.apiUrl}/${this.serviceName}/${this.controller}/save`;
    return this.http.post<ServiceResult>(url, JSON.parse(JSON.stringify(entities)));
  }
}
