import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwtComboboxComponent } from './swt-combobox.component';
import { DxSelectBoxModule } from 'devextreme-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SwtComboboxComponent],
  imports: [
    CommonModule,
    DxSelectBoxModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [SwtComboboxComponent]
})
export class SwtComboboxModule { }
