import { ThisReceiver } from "@angular/compiler";
import { Field } from "./field.model";

export class PaginationRequest {
  public pageIndex: number = 1;

  public pageSize: number = 30;

  public fields: Field[] = [];

  public sorts: SortModel[] = [];
}

export class SortModel {
  public fieldName = "";

  public sortAscending = true;

  constructor(fieldName = "", sortAscending = true) {
    this.fieldName = fieldName;
    this.sortAscending = sortAscending;
  }
}
