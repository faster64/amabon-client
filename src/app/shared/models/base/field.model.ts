export class Field {
  public fieldName = "";

  public value: any;

  constructor(fieldName: string, value: any) {
    this.fieldName = fieldName;
    this.value = value;
  }
}
