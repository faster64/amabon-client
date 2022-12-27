import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/enumerations/common.enum';
import { PaymentCategoryFormComponent } from './payment-category-form/payment-category-form.component';
import { PaymentCategoryListComponent } from './payment-category-list/payment-category-list.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentListComponent } from './payment-list/payment-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'category',
    redirectTo: 'category/list'
  },
  {
    path: 'list',
    component: PaymentListComponent,
  },
  {
    path: 'category/list',
    component: PaymentCategoryListComponent,
  },
  {
    path: 'create',
    data: { formMode: FormMode.Add },
    component: PaymentFormComponent
  },
  {
    path: 'category/create',
    data: { formMode: FormMode.Add },
    component: PaymentCategoryFormComponent
  },
  {
    path: 'view/:id',
    data: { formMode: FormMode.View },
    component: PaymentFormComponent
  },
  {
    path: 'category/view/:id',
    data: { formMode: FormMode.View },
    component: PaymentCategoryFormComponent
  },
  {
    path: 'edit/:id',
    data: { formMode: FormMode.Edit },
    component: PaymentFormComponent
  },
  {
    path: 'category/edit/:id',
    data: { formMode: FormMode.Edit },
    component: PaymentCategoryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
