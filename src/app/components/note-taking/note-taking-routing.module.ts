import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/enumerations/common.enum';
import { NoteTakingCreateComponent } from './note-taking-form/note-taking-form.component';
import { NoteTakingListComponent } from './note-taking-list/note-taking-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: NoteTakingListComponent
  },
  {
    path: 'create',
    data: { formMode: FormMode.Add },
    component: NoteTakingCreateComponent
  },
  {
    path: 'view/:id',
    data: { formMode: FormMode.View },
    component: NoteTakingCreateComponent
  },
  {
    path: 'edit/:id',
    data: { formMode: FormMode.Edit },
    component: NoteTakingCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteTakingRoutingModule { }
