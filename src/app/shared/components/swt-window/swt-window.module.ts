import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwtWindowComponent } from './swt-window.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [SwtWindowComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [SwtWindowComponent]
})
export class SwtWindowModule { }
