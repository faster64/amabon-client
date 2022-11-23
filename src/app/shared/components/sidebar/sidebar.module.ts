import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
