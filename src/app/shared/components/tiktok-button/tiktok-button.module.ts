import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
// import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { TiktokButton } from './tiktok-button.component';

@NgModule({
  declarations: [TiktokButton],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    TiktokButton
  ]
})
export class TiktokButtonModule { }
