import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SWETeamNotFoundRoutingModule } from './swt-not-found-routing.module';
import { SwtButtonModule } from '../swt-button/swt-button.module';
import { SwtNotFound } from './swt-not-found.component';


@NgModule({
  declarations: [SwtNotFound],
  imports: [
    CommonModule,
    SWETeamNotFoundRoutingModule,
    SwtButtonModule,
  ],
  exports: [SwtNotFound]
})
export class SWETeamNotFoundModule { }
