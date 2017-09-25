import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppMenuService } from './app-menu/app-menu.service';
import { AppCommonModule } from './app-common/app-common.module';
import { AppLoginRoutingModule } from './app-login/app-login-routing.module';
import { AppLoginModule } from './app-login/app-login.module';
import { RepositoryRoutingModule } from './repository/repository-routing.module';
import { RepositoryModule } from './repository/repository.module';
import { SearchModule } from './search/search.module';
import { SearchRoutingModule } from './search/search-routing.module';
import { MyFilesModule } from './my-files/my-files.module';
import { MyFilesRoutingModule } from './my-files/my-files-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppCommonModule,
    AppLoginModule,
    AppLoginRoutingModule,
    RepositoryModule,
    RepositoryRoutingModule,
    SearchModule,
    SearchRoutingModule,
    MyFilesModule,
    MyFilesRoutingModule
  ],
  providers: [AppMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
