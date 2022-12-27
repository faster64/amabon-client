import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/enumerations/common.enum';
import { IncomeCategoryFormComponent } from './income-category-form/income-category-form.component';
import { IncomeCategoryListComponent } from './income-category-list/income-category-list.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { IncomeListComponent } from './income-list/income-list.component';

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
    component: IncomeListComponent,
  },
  {
    path: 'category/list',
    component: IncomeCategoryListComponent,
  },
  {
    path: 'create',
    data: { formMode: FormMode.Add },
    component: IncomeFormComponent
  },
  {
    path: 'category/create',
    data: { formMode: FormMode.Add },
    component: IncomeCategoryFormComponent
  },
  {
    path: 'view/:id',
    data: { formMode: FormMode.View },
    component: IncomeFormComponent
  },
  {
    path: 'category/view/:id',
    data: { formMode: FormMode.View },
    component: IncomeCategoryFormComponent
  },
  {
    path: 'edit/:id',
    data: { formMode: FormMode.Edit },
    component: IncomeFormComponent
  },
  {
    path: 'category/edit/:id',
    data: { formMode: FormMode.Edit },
    component: IncomeCategoryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }
