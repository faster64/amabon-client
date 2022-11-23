import { BaseMessageResponse } from "src/app/shared/models/base/base-message-response";
import { ValidateField } from "src/app/shared/models/base/validate-field";

export class AuthResult extends BaseMessageResponse {

  /// Access token
  public accessToken: string = "";

  /// Refresh Token
  public refreshToken: string = "";

  /// OTP
  public otp: string = "";

  /// Thông tin validate
  public validateInfo! : ValidateField[];
}
