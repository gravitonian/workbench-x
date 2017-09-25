import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyFilesListPageComponent } from './my-files-list-page/my-files-list-page.component';

const routes: Routes = [ {
  path: 'my-files',
  component: MyFilesListPageComponent,
  data: {
    hidden: false,
    title: 'My Files'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFilesRoutingModule { }
