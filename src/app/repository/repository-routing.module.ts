import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepositoryPageComponent } from './repository-page/repository-page.component';
import { RepositoryDetailsPageComponent } from './repository-details-page/repository-details-page.component';
import { RepositoryListPageComponent } from './repository-list-page/repository-list-page.component';

import { AuthGuardEcm } from 'ng2-alfresco-core';

const routes: Routes = [
  {
    path: 'repository',
    component: RepositoryPageComponent,
    canActivate: [AuthGuardEcm],
    data: {
      hidden: false,
      title: 'Repository',
      needEcmAuth: true,
      isLogin: false
    },
    children: [
      { path: '', component: RepositoryListPageComponent, canActivate: [AuthGuardEcm] },
      { path: ':node-id', component: RepositoryDetailsPageComponent, canActivate: [AuthGuardEcm] }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule {
}
