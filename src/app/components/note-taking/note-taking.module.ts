import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwtEditorModule } from 'src/app/shared/components/swt-editor/swt-editor.module';

import { DxTextBoxModule } from 'devextreme-angular';
import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';
import { ListDynamicModule } from 'src/app/shared/components/swt-list-dynamic/swt-list-dynamic.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoteTakingListComponent } from './note-taking-list/note-taking-list.component';
import { NoteTakingCreateComponent } from './note-taking-form/note-taking-form.component';
import { NoteTakingRoutingModule } from './note-taking-routing.module';

@NgModule({
  declarations: [
    NoteTakingListComponent,
    NoteTakingCreateComponent,
  ],
  imports: [
    CommonModule,
    NoteTakingRoutingModule,
    SwtEditorModule,
    ListDynamicModule,
    SwtButtonModule,
    DxTextBoxModule,
    SharedModule,
  ],
  exports: [
    NoteTakingListComponent,
    NoteTakingCreateComponent,
  ],
})
export class NoteTakingModule { }
