import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WEB 3 SEED';
  isLoadingRoute = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoadingRoute = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel) {
        this.isLoadingRoute = false;
      }
    })
  }


}
