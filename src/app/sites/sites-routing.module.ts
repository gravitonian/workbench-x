import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SitesPageComponent } from './sites-page/sites-page.component';
import { SitesListPageComponent } from './sites-list-page/sites-list-page.component';
import { RepositoryDetailsPageComponent } from '../repository/repository-details-page/repository-details-page.component';

const routes: Routes = [{
  path: 'sites',
  component: SitesPageComponent,
  data: {
    hidden: false,
    title: 'Sites'
  },
  children: [
    { path: '', component: SitesListPageComponent },
    { path: ':node-id', component: RepositoryDetailsPageComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule {}
