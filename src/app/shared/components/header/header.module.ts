import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { SwtButtonModule } from '../swt-button/swt-button.module';
import {MatMenuModule} from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SwtLoadingModule } from '../loading/swt-loading.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SwtButtonModule,
    MatMenuModule,
    MatTooltipModule,
    SwtLoadingModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
