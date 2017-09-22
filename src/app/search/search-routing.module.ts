import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResultPageComponent } from './search-result-page/search-result-page.component';

const routes: Routes = [
  { path: 'search',
    component: SearchResultPageComponent,
    data: {
      hidden: true,
      title: 'Search'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
