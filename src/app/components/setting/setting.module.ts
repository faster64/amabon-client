import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { SecurityComponent } from './security/security.component';
import { DxCheckBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';
import { SwtGridModule } from 'src/app/shared/components/swt-grid/swt-grid.module';


@NgModule({
  declarations: [SettingComponent, SecurityComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    SharedModule,
    SwtButtonModule,
    SwtGridModule,
  ],
  exports: [SettingComponent, SecurityComponent]
})
export class SettingModule { }
