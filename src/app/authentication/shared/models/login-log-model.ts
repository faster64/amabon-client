import { BaseModel } from "src/app/shared/models/base/base-model";

export class LoginLog extends BaseModel {
  public IP = "";

  public Browser = "";

  public OS = "";

  public Device = "";

  public UA = "";

  public MAC = "";

  public IpInformation: any;

  public More = "";
}
