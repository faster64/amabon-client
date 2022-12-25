import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMode } from 'src/app/shared/enumerations/common.enum';
import { IncomeFormComponent } from './income-form/income-form.component';
import { IncomeListComponent } from './income-list/income-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: IncomeListComponent,
  },
  {
    path: 'create',
    data: { formMode: FormMode.Add },
    component: IncomeFormComponent
  },
  {
    path: 'view/:id',
    data: { formMode: FormMode.View },
    component: IncomeFormComponent
  },
  {
    path: 'edit/:id',
    data: { formMode: FormMode.Edit },
    component: IncomeFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }
