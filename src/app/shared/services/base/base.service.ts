import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CookieKey } from '../../constants/cookie.key';
import { CookieHelper } from '../../helpers/cookie.hepler';
import { PaginationRequest } from '../../models/base/pagination-request';
import { ServiceResult } from '../../models/base/service-result';
import { HttpOption, HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private apiUrl = environment.api_url;

  serviceName = "";

  controller = "";

  userId = '';

  _http!: HttpService;

  _baseOptions!: HttpOption;

  constructor(
    public http: HttpService
  ) {
    this._http = http;
    this.getUserId();
  }

  takeOriginHttpClient() {
    return this._http.http;
  }

  getUserId() {
    this.userId = CookieHelper.getCookie(`${environment.team}_${CookieKey.USER_ID}`) || '';
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
    return this.http.get<ServiceResult>(url, this._baseOptions);
  }

  /**
   * Get all
   */
  getAll(customUrl = ""): Observable<ServiceResult> {
    const url = customUrl ? customUrl : `${this.apiUrl}/${this.serviceName}/${this.controller}/get-all`;
    return this.http.get<ServiceResult>(url, this._baseOptions);
  }

  /**
   * Lấy dữ liệu paging
   */
  getPaging(customUrl = "", paginationRequest: PaginationRequest): Observable<ServiceResult> {
    if (paginationRequest == null) {
      throw new Error(`Parameter paginationRequest cannot be null`);
    }

    const url = customUrl ? customUrl : `${this.apiUrl}/${this.serviceName}/${this.controller}/paging`;
    return this.http.post<ServiceResult>(url, paginationRequest, this._baseOptions);
  }

  update(customUrl = "", entity: any) {
    if (!entity) {
      throw new Error(`Entity cannot be null`);
    }

    const url = customUrl ? customUrl : `${this.apiUrl}/${this.serviceName}/${this.controller}/update`;
    return this.http.put<ServiceResult>(url, entity, this._baseOptions);
  }

  delete(customUrl = "", ids: any[]) {
    if (!ids || ids.length == 0)
      throw new Error("param cannot be null");

    const url = customUrl ? customUrl : `${this.apiUrl}/${this.serviceName}/${this.controller}/delete`;
    return this.http.delete<ServiceResult>(url, ids.map(id => id + ""), this._baseOptions);
  }

  /**
   * Find by fields
   */
  findByFields(customUrl = "", paginationRequest: PaginationRequest) {
    if (paginationRequest == null) {
      throw new Error(`Parameter paginationRequest cannot be null`);
    }

    const url = customUrl ? customUrl : `${this.apiUrl}/${this.serviceName}/${this.controller}/find-by-fields`;
    return this.http.post<ServiceResult>(url, paginationRequest, this._baseOptions);
  }


  /**
   * Save
   */
  save(customUrl: string = "", entities: any[]) {
    const url = customUrl ? customUrl : `${this.apiUrl}/${this.serviceName}/${this.controller}/save`;
    return this.http.post<ServiceResult>(url, JSON.parse(JSON.stringify(entities)), this._baseOptions);
  }
}
