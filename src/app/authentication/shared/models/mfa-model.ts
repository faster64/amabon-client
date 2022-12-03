import { MfaType } from "src/app/shared/enumerations/common.enum";
import { BaseModel } from "src/app/shared/models/base/base-model";

export class MFA extends BaseModel {
  public type = MfaType.None;

  public enabled: any = false;
}
