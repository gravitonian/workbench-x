import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLoginPageComponent } from './app-login-page/app-login-page.component';

const routes: Routes = [{
  path: 'login',
  component: AppLoginPageComponent,
  data: {
    hidden: false,
    title: 'Login',
    isLogin: true
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLoginRoutingModule { }

