import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessDeniedRoutingModule } from './access-denied-routing.module';
import { SwtButtonModule } from '../swt-button/swt-button.module';
import { AccessDeniedComponent } from './access-denied.component';


@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [
    CommonModule,
    AccessDeniedRoutingModule,
    SwtButtonModule
  ],
  exports: [AccessDeniedComponent]
})
export class AccessDeniedModule { }
