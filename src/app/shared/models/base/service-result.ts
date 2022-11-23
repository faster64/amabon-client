import { HttpStatusCode } from "@angular/common/http";
import { BaseMessageResponse } from "./base-message-response";
import { ValidateField } from "./validate-field";

export class ServiceResult extends BaseMessageResponse {
  public data: any;

  public validateInfo!: ValidateField[];

  public hasPermission: boolean = true;

  public total: number = 0;
}
