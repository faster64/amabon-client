import { BaseModel } from "../base/base-model";
import { GroupBox } from "./group-box.model";

export class Module extends BaseModel {
  public moduleName = "";

  public path = "";

  public iconPosition = "";

  public iconCheckedPosition = "";

  public groupBoxes: GroupBox[] = [];
}
