import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitesRoutingModule } from './sites-routing.module';
import { SitesPageComponent } from './sites-page/sites-page.component';
import { SitesListPageComponent } from './sites-list-page/sites-list-page.component';

import { AppCommonModule } from '../app-common/app-common.module';
import { DocumentListModule } from 'ng2-alfresco-documentlist';
import { UploadModule } from 'ng2-alfresco-upload';
import { ViewerModule } from 'ng2-alfresco-viewer';


@NgModule({
  imports: [
    CommonModule,
    SitesRoutingModule,

    /* Common App imports (Angular Core and Material, ADF Core */
    AppCommonModule,

    /* ADF libs specific to this module */
    DocumentListModule,
    UploadModule,
    ViewerModule
  ],
  declarations: [SitesPageComponent, SitesListPageComponent]
})
export class SitesModule { }
