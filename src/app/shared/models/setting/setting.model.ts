import { BaseModel } from "../base/base-model";
import { SidebarSetting } from "./sidebar-setting.model";

export class UserSetting extends BaseModel {
  public sidebarSetting!: SidebarSetting;
}
