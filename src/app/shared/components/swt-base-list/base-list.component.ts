import { Component, Directive, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormMode } from '../../enumerations/common.enum';
import { BaseModel } from '../../models/base/base-model';
import { ColumnGrid } from '../../models/base/column-grid.model';
import { ServiceResult } from '../../models/base/service-result';
import { BaseService } from '../../services/base/base.service';
import { BaseComponent } from '../base-component';
import { IBaseList as IBaseList } from './ibase-list';

@Directive()
export class BaseListComponent extends BaseComponent implements IBaseList {

  FormMode = FormMode;

  displayColumn: ColumnGrid[] = [];

  serviceName = "";

  controller = "";

  constructor(
    baseService: BaseService
  ) {
    super(baseService);
  }

  initDisplayColumn(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    super.ngOnInit();
  }

  initData() {
    this.initDisplayColumn();
  }

}
