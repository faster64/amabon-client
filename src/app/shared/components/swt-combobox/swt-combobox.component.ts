import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'swt-combobox',
  templateUrl: './swt-combobox.component.html',
  styleUrls: ['./swt-combobox.component.scss']
})
export class SwtComboboxComponent implements OnInit {

  @Input()
  dataSource: any[] = [];

  @Input()
  displayExpr = "";

  @Input()
  valueExpr = "";

  @Input()
  placeholder = "";

  @Input()
  noDataText = "Không có dữ liệu";

  @Input()
  disabled = false;

  @Input()
  readOnly = false;

  @Input()
  width = undefined;

  @Input()
  height = undefined;

  @Input()
  label = "";

  @Input()
  hint = "";

  @Input()
  name = "";

  @Input()
  value: any;

  @Input()
  isFetching = false;

  @Output()
  onOpened = new EventEmitter();

  @Output()
  onValueChanged = new EventEmitter();

  @Output()
  onEnterKey = new EventEmitter();

  @Output()
  onBlur = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  public onOpenedFunc(e: any) {
    this.onOpened.emit(e);
  }
  public onValueChangedFunc(e: any) {
    this.onValueChanged.emit(e);
  }
  public onEnterKeyFunc(e: any) {
    this.onEnterKey.emit(e);
  }
  public onBlurFunc(e: any) {
    this.onBlur.emit(e);
  }

}
