import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepositoryPageComponent } from './repository-page/repository-page.component';
import { RepositoryDetailsPageComponent } from './repository-details-page/repository-details-page.component';
import { RepositoryListPageComponent } from './repository-list-page/repository-list-page.component';

const routes: Routes = [
  {
    path: 'repository',
    component: RepositoryPageComponent,
    data: {
      hidden: false,
      title: 'Repository'
    },
    children: [
      { path: '', component: RepositoryListPageComponent },
      { path: ':node-id', component: RepositoryDetailsPageComponent }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule {
}
