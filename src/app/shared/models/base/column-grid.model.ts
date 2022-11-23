import { GroupBoxFieldType } from "../../enumerations/common.enum";

export class ColumnGrid {
  public column = "";

  public displayText = "";

  public width? = 160; // < 0 tương ứng với 100%

  public type? = GroupBoxFieldType.Text;

  public tagColor? = ""; // Dùng với type là Tag

  public disabledFilter? = false;

  public sortable? = true;
}
