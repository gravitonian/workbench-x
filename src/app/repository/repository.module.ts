import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoryPageComponent } from './repository-page/repository-page.component';

import { AppCommonModule } from '../app-common/app-common.module';
import { DocumentListModule } from 'ng2-alfresco-documentlist';
import { UploadModule } from 'ng2-alfresco-upload';


@NgModule({
  imports: [
    CommonModule,
    RepositoryRoutingModule,

    /* Common App imports (Angular Core and Material, ADF Core */
    AppCommonModule,

    /* ADF libs specific to this module */
    DocumentListModule,
    UploadModule
  ],
  declarations: [RepositoryPageComponent]
})
export class RepositoryModule { }
