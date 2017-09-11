import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

/* Data for a menu item */
export class MenuItem {
  path: string;   /* The URL path to the page */
  title: string;  /* The Title of the page */
  icon?: string;  /* An optional icon for the page title */
}

@Injectable()
export class AppMenuService {

  /* Keep track of which menu item is currently being active/selected */
  activeMenuItem$: Observable<MenuItem>;

  constructor(private router: Router, private titleService: Title) {
    this.activeMenuItem$ = this.router.events
      .filter(e => e instanceof NavigationEnd)
      .map(_ => this.router.routerState.root)
      .map(route => {
        const active = this.lastRouteWithMenuItem(route.root);
        this.titleService.setTitle(active.title);
        return active;
      });
  }

  /**
   * Get the MenuItem array that should be displayed.
   * @returns {MenuItem[]}
   */
  getMenuItems(): MenuItem[] {
    return this.router.config
      .filter(route => route.data && route.data.title)
      .map(route => {
        if (!route.data.title) {
          throw new Error('Missing title for toolbar menu route ' + route.path);
        }
        return {
          path: route.path,
          title: route.data.title,
          icon: route.data.icon
        };
      });
  }

  private lastRouteWithMenuItem(route: ActivatedRoute): MenuItem {
    let lastMenu;
    do {
      lastMenu = this.extractMenu(route) || lastMenu;
    }
    while ((route = route.firstChild));
    return lastMenu;
  }

  private extractMenu(route: ActivatedRoute): MenuItem {
    const cfg = route.routeConfig;
    return cfg && cfg.data && cfg.data.title
      ? {path: cfg.path, title: cfg.data.title, icon: cfg.data.icon}
      : undefined;
  }}
