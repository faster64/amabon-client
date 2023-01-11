import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesInFolderComponent } from './files-in-folder/files-in-folder.component';
import { StorageComponent } from './storage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folders'
  },
  {
    path: 'folders',
    component: StorageComponent
  },
  {
    path: 'view-files/:folder',
    component: FilesInFolderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule { }
