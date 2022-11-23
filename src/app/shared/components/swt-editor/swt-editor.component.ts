import { Component, Input, OnInit } from '@angular/core';
import { BaseService } from '../../services/base/base.service';
import { BaseComponent } from '../base-component';
import { TabConfig } from './models/tab-config.model';

@Component({
  selector: 'swt-editor',
  templateUrl: './swt-editor.component.html',
  styleUrls: ['./swt-editor.component.scss']
})
export class SwtEditorComponent extends BaseComponent {

  @Input()
  isMultiline: any = false;

  @Input()
  readOnly = false;

  @Input()
  placeholder = "Nội dung...";

  @Input()
  valueContent = "";

  tabs!: TabConfig[];

  currentTab!: string[];

  constructor(baseService: BaseService) {
    super(baseService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.init();
  }

  init() {
    this.tabs = this.getTabsData();
    this.currentTab = this.tabs[2].value;
  }

  getTabsData(): TabConfig[] {
    const tabsData: TabConfig[] = [
      { name: 'From This Device', value: ['file'] },
      { name: 'From the Web', value: ['url'] },
      { name: 'Both', value: ['file', 'url'] },
    ];
    return tabsData;
  }
}

