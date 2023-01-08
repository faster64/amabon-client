import { CommonConstant } from "../../constants/common.constant";
import { DateHelper } from "../../helpers/date.helper";
import { BaseModel } from "../base/base-model";
import { DutyPeriod } from "./duty-period.model";

export class Duty extends BaseModel {
  public dutyName = "";

  public content = "";

  public assignedId = CommonConstant.ZERO_GUID;

  public fromDate = DateHelper.now;

  public toDate = DateHelper.now;

  public estimate = 0.0;

  public actualDate = 0.0;

  public priority = 0;

  public isCompleted = false;

  public sortOrder = 0;

  public categoryId = 0;

  public categoryName = "";

  public dutyPeriod: DutyPeriod = new DutyPeriod();
}
