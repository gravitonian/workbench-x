import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppMenuService } from '../../app-menu/app-menu.service';

@Component({
  selector: 'app-app-login-page',
  templateUrl: './app-login-page.component.html',
  styleUrls: ['./app-login-page.component.css']
})
export class AppLoginPageComponent implements OnInit {

  constructor(private router: Router, private menuService: AppMenuService) { }

  ngOnInit() {
  }

  onLoginSuccess($event) {
    console.log('Successful login: ' + $event.value);

    // Tell parent component that successful login has happened and menu should change
    this.menuService.fireMenuChanged();

    // Show the whole repository by default
    this.router.navigate(['/repository']);
  }

  onLoginError($event) {
    console.log('Failed login: ' + $event.value);
  }
}

