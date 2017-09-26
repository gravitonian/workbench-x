import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyFilesPageComponent } from './my-files-page/my-files-page.component';
import { MyFilesListPageComponent } from './my-files-list-page/my-files-list-page.component';
import { RepositoryDetailsPageComponent } from '../repository/repository-details-page/repository-details-page.component';

const routes: Routes = [ {
  path: 'my-files',
  component: MyFilesPageComponent,
  data: {
    hidden: false,
    title: 'My Files'
  },
  children: [
    { path: '', component: MyFilesListPageComponent },
    { path: ':node-id', component: RepositoryDetailsPageComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFilesRoutingModule { }
