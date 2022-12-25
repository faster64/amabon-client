import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDynamicComponent } from './swt-list-dynamic.component';
import { SharedModule } from '../../shared.module';
import { SwtButtonModule } from '../swt-button/swt-button.module';
import { SwtGridModule } from '../swt-grid/swt-grid.module';
import { MatMenuModule } from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import { PopupChooseExportComponent } from './popup-choose-export/popup-choose-export.component';
import { SwtWindowModule } from '../swt-window/swt-window.module';
import { DxTextBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [ListDynamicComponent, PopupChooseExportComponent],
  imports: [
    CommonModule,
    SharedModule,
    SwtButtonModule,
    SwtGridModule,
    SwtWindowModule,
    MatMenuModule,
    MatCardModule,
    MatRadioModule,
    SwtWindowModule,
    DxTextBoxModule,
  ],
  exports: [ListDynamicComponent, PopupChooseExportComponent]
})
export class SwtListDynamicModule { }
