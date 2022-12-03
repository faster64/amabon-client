import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingOption } from 'src/app/shared/constants/common.constant';
import { SecurityComponent } from './security/security.component';
import { SettingComponent } from './setting.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'security',
    pathMatch: 'full'
  },
  {
    path: 'security',
    data: {
      option: SettingOption.SECURITY
    },
    component: SettingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
