import { BaseModel } from "../base/base-model";

export class DutyPeriod extends BaseModel {
  public dutyId = 0;

  public hasNotifyAt?: Date;

  public period = 60;

  public enableNotify = true;
}
