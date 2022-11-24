import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SwtLoadingModule } from "./components/loading/swt-loading.module";
import { CountDownPipe } from "./pipes/count-down.pipe";
import { DateVietnamPipe } from "./pipes/date.pipe";
import { SidebarModule } from "./components/sidebar/sidebar.module";
import { NumberFormatPipe } from "./pipes/number-format.pipe";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HeaderModule } from "./components/header/header.module";
import { SwtFilterModule } from "./components/swt-filter/swt-filter.module";
import { DxFileUploaderModule, DxProgressBarModule } from "devextreme-angular";

@NgModule({
  declarations: [
    DateVietnamPipe,
    CountDownPipe,
    NumberFormatPipe,
  ],
  imports: [
    CommonModule,
    SwtLoadingModule,
    HeaderModule,
    SidebarModule,
    MatProgressBarModule,
    MatTooltipModule,
    SwtFilterModule,
    DxFileUploaderModule,
    DxProgressBarModule,
  ],
  exports: [
    SwtLoadingModule,
    HeaderModule,
    SidebarModule,
    DateVietnamPipe,
    CountDownPipe,
    NumberFormatPipe,
    MatProgressBarModule,
    MatTooltipModule,
    SwtFilterModule,
    DxFileUploaderModule,
    DxProgressBarModule,
  ]
})
export class SharedModule { }
