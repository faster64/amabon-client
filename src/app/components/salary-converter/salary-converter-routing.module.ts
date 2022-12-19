import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryConverterComponent } from './salary-converter.component';

const routes: Routes = [
  {
    path: '',
    component: SalaryConverterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryConverterRoutingModule { }
