import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/enumerations/common.enum';
import { AmazonStoreCreateComponent } from './amazon-store-form/amazon-store-form.component';
import { AmazonStoreListComponent } from './amazon-store-list/amazon-store-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: AmazonStoreListComponent
  },
  {
    path: 'create',
    data: { formMode: FormMode.Add },
    component: AmazonStoreCreateComponent
  },
  {
    path: 'view/:id',
    data: { formMode: FormMode.View },
    component: AmazonStoreCreateComponent
  },
  {
    path: 'edit/:id',
    data: { formMode: FormMode.Edit },
    component: AmazonStoreCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmazonStoreRoutingModule { }
