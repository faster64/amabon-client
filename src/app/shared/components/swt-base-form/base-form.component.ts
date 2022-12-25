import { Component, Directive, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormMode } from '../../enumerations/common.enum';
import { GroupBoxField } from '../../models/form-dynamic/group-box-field.model';
import { GroupBox } from '../../models/form-dynamic/group-box.model';
import { BaseService } from '../../services/base/base.service';
import { BaseComponent } from '../base-component';
import { IBaseForm } from './ibase-form';


@Directive()
export class BaseFormComponent extends BaseComponent implements IBaseForm {

  formMode = FormMode.None;

  groupBoxes: GroupBox[] = [];

  serviceName = "";

  controller = "";

  constructor(
    baseService: BaseService,
    public activatedRoute: ActivatedRoute
  ) {
    super(baseService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  initData() {
    this.getFormMode();
    this.initGroupboxes();
  }

  initGroupboxes(): void {
    throw new Error('Method not implemented.');
  }

  getFormMode() {
    this.formMode = this.activatedRoute.snapshot.data["formMode"];
  }

}
