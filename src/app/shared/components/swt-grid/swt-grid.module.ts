import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwtGridComponent } from './swt-grid.component';
import { SwtLoadingModule } from '../loading/swt-loading.module';
import { SharedModule } from '../../shared.module';
import { DxCheckBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [SwtGridComponent],
  imports: [
    CommonModule,
    SwtLoadingModule,
    SharedModule,
    DxCheckBoxModule,
  ],
  exports: [SwtGridComponent, SwtLoadingModule]
})
export class SwtGridModule { }
