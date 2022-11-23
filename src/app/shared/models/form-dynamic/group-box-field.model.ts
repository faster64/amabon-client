import { GroupBoxFieldType } from "../../enumerations/common.enum";

export class GroupBoxField {
  public fieldName = "";

  public value: any;

  public title = "";

  public type? = GroupBoxFieldType.Text;

  public scale? = 12;

  public required?= false;

  public placeholder? = "";

  public comboboxUrl? = "";

  public pickList?: ComboBoxItem[] = [];

  public comboboxMap?: ComboBoxMap;

  public isDisplay? = true;

  public width? = 0;

  constructor(
    fieldName: string,
    value: any,
    title: string,
    type: GroupBoxFieldType,
    scale = 12,
    required = false,
    placeholder = "",
    comboboxUrl = "",
    pickList = [],
    comboboxMap = {id: "", value: ""},
    isDisplay = true,
    width = 0,
  ) {
    this.fieldName = fieldName;
    this.value = value;
    this.title = title;
    this.type = type;
    this.scale = scale;
    this.required = required;
    this.placeholder = placeholder;
    this.comboboxUrl = comboboxUrl;
    this.pickList = pickList;
    this.comboboxMap = comboboxMap;
    this.isDisplay = isDisplay;
    this.width = width;
  }
}

export class ComboBoxMap {
  public id = "";
  public value = "";
}

export class ComboBoxItem {
  public id: any;
  public value: any;
}
