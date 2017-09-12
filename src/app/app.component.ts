import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppMenuService, MenuItem } from './app-menu/app-menu.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = 'Workbench X';
  mainMenuItems;
  activeMenuItem$: Observable<MenuItem>;

  constructor(private menuService: AppMenuService) {
    this.mainMenuItems = this.menuService.getMenuItems();
    this.activeMenuItem$ = this.menuService.activeMenuItem$;
  }
}
