import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFilesRoutingModule } from './my-files-routing.module';
import { MyFilesListPageComponent } from './my-files-list-page/my-files-list-page.component';

import { AppCommonModule } from '../app-common/app-common.module';
import { DocumentListModule } from 'ng2-alfresco-documentlist';
import { UploadModule } from 'ng2-alfresco-upload';
import { ViewerModule } from 'ng2-alfresco-viewer';

@NgModule({
  imports: [
    CommonModule,
    MyFilesRoutingModule,

    /* Common App imports (Angular Core and Material, ADF Core */
    AppCommonModule,

    /* ADF libs specific to this module */
    DocumentListModule,
    UploadModule,
    ViewerModule
  ],
  declarations: [MyFilesListPageComponent]
})
export class MyFilesModule { }
