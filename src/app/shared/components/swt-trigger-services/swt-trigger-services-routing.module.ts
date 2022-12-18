import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwtTriggerServicesComponent } from './swt-trigger-services.component';

const routes: Routes = [
  {
    path: '',
    component: SwtTriggerServicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwtTriggerServicesRoutingModule { }
