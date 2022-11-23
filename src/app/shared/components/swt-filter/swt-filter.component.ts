import { Component, Input, ViewChild } from '@angular/core';
import { ButtonType, IconButtonType } from '../../constants/button.constant';
import { FilterCondition } from '../../enumerations/common.enum';
import { ColumnGrid } from '../../models/base/column-grid.model';
import { BaseService } from '../../services/base/base.service';
import { Utility } from '../../utils/utility';
import { BaseComponent } from '../base-component';
import { SwtButton } from '../swt-button/swt-button.component';


export class Condition {
  public fieldName: string = "";
  public value: any;
  public condition: FilterCondition = FilterCondition.Equal;
}

@Component({
  selector: 'swt-filter',
  templateUrl: './swt-filter.component.html',
  styleUrls: ['./swt-filter.component.scss']
})
export class SwtFilterComponent extends BaseComponent {

  Utility = Utility;

  ButtonType = ButtonType;

  IconButtonType = IconButtonType;

  conditionTypes = [
    { value: FilterCondition.Equal, text: "Bằng" },
    { value: FilterCondition.GreaterThan, text: "Lớn hơn" },
    { value: FilterCondition.GE, text: "Lớn hơn hoặc bằng" },
    { value: FilterCondition.LessThan, text: "Nhỏ hơn" },
    { value: FilterCondition.LE, text: "Nhỏ hơn hoặc bằng" },
    { value: FilterCondition.Contains, text: "Chứa" },
    { value: FilterCondition.StartWiths, text: "Bắt đầu bằng" },
    { value: FilterCondition.EndWiths, text: "Kết thúc bằng" },
  ]

  @Input()
  columns: ColumnGrid[] = [];

  @ViewChild("addConditionBtn")
  addConditionBtn!: SwtButton;

  groups: any[] = [];

  conditions: Condition[] = [];

  constructor(baseService: BaseService) {
    super(baseService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  initData() {
    this.conditions = [new Condition()];
  }

  addCondition() {
    this.addConditionBtn.isFinished = true;
    this.conditions.push(new Condition());
  }

}
