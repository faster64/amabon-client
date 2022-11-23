import { NgModule } from '@angular/core';
import { SwtButton } from './swt-button.component';
import {MatButtonModule} from '@angular/material/button';
// import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SwtButton],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    SwtButton
  ]
})
export class SwtButtonModule { }
