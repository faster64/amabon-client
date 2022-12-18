import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwtTriggerServicesComponent } from './swt-trigger-services.component';
import { SwtTriggerServicesRoutingModule } from './swt-trigger-services-routing.module';
import { SwtButtonModule } from '../swt-button/swt-button.module';

@NgModule({
  declarations: [SwtTriggerServicesComponent],
  imports: [
    CommonModule,
    SwtTriggerServicesRoutingModule,
    SwtButtonModule,
  ],
  exports: [SwtTriggerServicesComponent]
})
export class SwtTriggerServicesModule { }
