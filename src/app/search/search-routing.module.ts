import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResultPageComponent } from './search-result-page/search-result-page.component';

import { AuthGuardEcm } from 'ng2-alfresco-core';

const routes: Routes = [
  { path: 'search',
    component: SearchResultPageComponent,
    canActivate: [AuthGuardEcm],
    data: {
      hidden: true,
      title: 'Search',
      needEcmAuth: true,
      isLogin: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
