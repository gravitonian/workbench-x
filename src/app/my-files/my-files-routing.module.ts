import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyFilesPageComponent } from './my-files-page/my-files-page.component';
import { MyFilesListPageComponent } from './my-files-list-page/my-files-list-page.component';
import { RepositoryDetailsPageComponent } from '../repository/repository-details-page/repository-details-page.component';

import { AuthGuardEcm } from 'ng2-alfresco-core';

const routes: Routes = [ {
  path: 'my-files',
  component: MyFilesPageComponent,
  canActivate: [AuthGuardEcm],
  data: {
    hidden: false,
    title: 'My Files',
    needEcmAuth: true,
    isLogin: false
  },
  children: [
    { path: '', component: MyFilesListPageComponent, canActivate: [AuthGuardEcm] },
    { path: ':node-id', component: RepositoryDetailsPageComponent, canActivate: [AuthGuardEcm]  }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFilesRoutingModule { }
