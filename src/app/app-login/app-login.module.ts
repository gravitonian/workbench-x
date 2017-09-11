import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLoginRoutingModule } from './app-login-routing.module';
import { AppLoginPageComponent } from './app-login-page/app-login-page.component';

import { LoginModule } from 'ng2-alfresco-login';

@NgModule({
  imports: [
    CommonModule,
    AppLoginRoutingModule,

    /* ADF libs */
    LoginModule
  ],
  declarations: [AppLoginPageComponent]
})
export class AppLoginModule { }
