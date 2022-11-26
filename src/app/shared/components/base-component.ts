import { Directive, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { ButtonColor, ButtonType } from "../constants/button.constant";
import { Routing } from "../constants/common.constant";
import { ActionPermission } from "../enumerations/permission.enum";
import { PaginationRequest } from "../models/base/pagination-request";
import { BaseService } from "../services/base/base.service";

@Directive()
export class BaseComponent implements OnInit, OnDestroy {

  ButtonType = ButtonType;

  ButtonColor = ButtonColor;

  ActionPermission = ActionPermission;

  Routing = Routing;

  isLoading: boolean = false;

  paginationRequest = new PaginationRequest();

  public _onDestroySub: Subject<void> = new Subject<void>();

  constructor(
    public baseService: BaseService
  ) { }

  ngOnInit() {
    this.initData();
  }

  ngOnDestroy() {
    // unsubscribe khi destroy
    if (this._onDestroySub) {
      this._onDestroySub.next();
      this._onDestroySub.complete();
      this._onDestroySub.unsubscribe();
    }
  }

  initData() {
    return;
  }
}
