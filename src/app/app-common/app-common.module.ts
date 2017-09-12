import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Angular Material imports, only import the portions you will use to optimize build
    (MaterialModule to include all is deprecated) */
import {
  MdAutocompleteModule,
  MdCoreModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule, TRANSLATION_PROVIDER } from 'ng2-alfresco-core';

@NgModule({
  imports: [
    /** Angular Core */
    CommonModule,

    /** Angular Material */
    MdAutocompleteModule,
    MdCoreModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTabsModule,
    FlexLayoutModule,

    /* Alfresco ADF */
    CoreModule
  ],
  declarations: [],
  providers: [
    {
      provide: TRANSLATION_PROVIDER,
      multi: true,
      useValue: {
        name: 'app',
        source: 'assets'
      }
    }
  ],
  exports: [
    MdAutocompleteModule,
    MdCoreModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTabsModule,
    FlexLayoutModule,

    /* Alfresco ADF */
    CoreModule
  ]
})
export class AppCommonModule { }

