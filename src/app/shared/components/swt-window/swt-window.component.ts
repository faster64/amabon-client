import { Component, Input, OnInit } from '@angular/core';
import { BaseService } from '../../services/base/base.service';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'swt-window',
  templateUrl: './swt-window.component.html',
  styleUrls: ['./swt-window.component.scss']
})
export class SwtWindowComponent extends BaseComponent {

  @Input()
  title = "";

  constructor(baseService: BaseService) {
    super(baseService);
  }

}
