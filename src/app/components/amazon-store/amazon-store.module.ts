import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwtEditorModule } from 'src/app/shared/components/swt-editor/swt-editor.module';

import { AmazonStoreRoutingModule } from './amazon-store-routing.module';
import { AmazonStoreListComponent } from './amazon-store-list/amazon-store-list.component';
import { AmazonStoreCreateComponent } from './amazon-store-form/amazon-store-form.component';
import { ListDynamicModule } from 'src/app/shared/components/swt-list-dynamic/swt-list-dynamic.module';
import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';
import { DxTextBoxModule } from 'devextreme-angular';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AmazonStoreListComponent,
    AmazonStoreCreateComponent,
  ],
  imports: [
    CommonModule,
    AmazonStoreRoutingModule,
    SwtEditorModule,
    ListDynamicModule,
    SwtButtonModule,
    DxTextBoxModule,
    SharedModule,
  ],
  exports: [
    AmazonStoreListComponent,
    AmazonStoreCreateComponent,
  ],
})
export class AmazonStoreModule { }
