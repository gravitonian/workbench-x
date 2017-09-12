import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-login-page',
  templateUrl: './app-login-page.component.html',
  styleUrls: ['./app-login-page.component.css']
})
export class AppLoginPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onLoginSuccess($event) {
    console.log('Successful login: ' + $event.value);
  }

  onLoginError($event) {
    console.log('Failed login: ' + $event.value);
  }

}

