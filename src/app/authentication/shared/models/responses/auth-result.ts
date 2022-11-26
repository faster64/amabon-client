import { BaseMessageResponse } from "src/app/shared/models/base/base-message-response";
import { ValidateField } from "src/app/shared/models/base/validate-field";
import { Step } from "./step.model";

export class AuthResult extends BaseMessageResponse {

  public accessToken: string = "";

  public refreshToken: string = "";

  public step = new Step();

  public validateInfo! : ValidateField[];
}
