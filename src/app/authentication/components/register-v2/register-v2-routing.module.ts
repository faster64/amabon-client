import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterStep } from '../../shared/enums/register-step.enum';
import { RegisterCompletedComponent } from './register-completed/register-completed.component';
import { RegisterV2Component } from './register-v2.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'step1',
    pathMatch: 'full'
  },
  {
    path: 'step1',
    component: RegisterV2Component,
    data: {
      step: RegisterStep.RequiredInformation
    }
  },
  {
    path: 'step2',
    component: RegisterV2Component,
    data: {
      step: RegisterStep.Verification
    }
  },
  {
    path: 'step3',
    component: RegisterV2Component,
    data: {
      step: RegisterStep.Password
    }
  },
  {
    path: 'step4',
    component: RegisterV2Component,
    data: {
      step: RegisterStep.CoreInformation
    },
  },
  {
    path: 'completed',
    component: RegisterCompletedComponent,
    data: {
      step: RegisterStep.Completed
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterV2RoutingModule { }
