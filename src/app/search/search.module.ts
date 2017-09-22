import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';

import { AppCommonModule } from '../app-common/app-common.module';

import { SearchModule as AdfSearchModule } from 'ng2-alfresco-search';
import { ViewerModule } from 'ng2-alfresco-viewer';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,

    /* Common App imports (Angular Core and Material, ADF Core */
    AppCommonModule,

    /* ADF libs specific to this module */
    AdfSearchModule,
    ViewerModule
  ],
  declarations: [SearchBarComponent, SearchResultPageComponent],
  exports: [SearchBarComponent]
})
export class SearchModule { }
