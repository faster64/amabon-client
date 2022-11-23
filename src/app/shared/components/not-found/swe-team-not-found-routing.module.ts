import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwtNotFound } from './swe-team-not-found.component';

const routes: Routes = [
  {
    path: "",
    component: SwtNotFound
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SWETeamNotFoundRoutingModule { }
