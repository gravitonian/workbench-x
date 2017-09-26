import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoryPageComponent } from './repository-page/repository-page.component';
import { RepositoryDetailsPageComponent } from './repository-details-page/repository-details-page.component';
import { RepositoryListPageComponent } from './repository-list-page/repository-list-page.component';

import { AppCommonModule } from '../app-common/app-common.module';
import { DocumentListModule } from 'ng2-alfresco-documentlist';
import { UploadModule } from 'ng2-alfresco-upload';
import { CardViewUpdateService } from 'ng2-alfresco-core';
import { ViewerModule } from 'ng2-alfresco-viewer';

@NgModule({
  imports: [
    CommonModule,
    RepositoryRoutingModule,

    /* Common App imports (Angular Core and Material, ADF Core */
    AppCommonModule,

    /* ADF libs specific to this module */
    DocumentListModule,
    UploadModule,
    ViewerModule
  ],
  declarations: [RepositoryPageComponent, RepositoryDetailsPageComponent, RepositoryListPageComponent],
  providers: [CardViewUpdateService] /* Need to set it up as a provider here as there is a bug in CoreModule, it does not import... */
})
export class RepositoryModule { }
