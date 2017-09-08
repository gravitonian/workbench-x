import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Workbench-X';

  onLoginSuccess($event) {
    console.log('Successful login: ' + $event.value);
  }

  onLoginError($event) {
    console.log('Failed login: ' + $event.value);
  }

}
