import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CustomPreloadStrategyService } from './core/services/custom-preload-strategy.service';

const routes: Routes = [{
  path: '',
  redirectTo: 'landing',
  pathMatch: 'full'
}, {
  path: 'landing',
  component: LandingComponent,
}, {
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  data: { shouldPreload: false }
}, {
  path: 'about',
  loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
  data: { shouldPreload: false }
}, {
  path: 'examples',
  loadChildren: () => import('./examples/examples.module').then(m => m.ExamplesModule),
  data: { shouldPreload: false }
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadStrategyService
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
