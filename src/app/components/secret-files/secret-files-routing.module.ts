import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesInFolderComponent } from './files-in-folder/files-in-folder.component';
import { SecretFilesComponent } from './secret-files.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folders'
  },
  {
    path: 'folders',
    component: SecretFilesComponent
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
export class SecretFilesRoutingModule { }
