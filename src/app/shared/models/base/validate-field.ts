import { ErrorCode } from "../../enumerations/error-code.enum";

export class ValidateField {
  public fieldName: string = "";

  public code!: ErrorCode;

  public errorMessage: string = "";
}
