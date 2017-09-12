import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepositoryPageComponent } from './repository-page/repository-page.component';

const routes: Routes = [{
  path: 'repository',
  component: RepositoryPageComponent,
  data: {
    title: 'Repository'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule { }
