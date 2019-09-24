import { Routes, RouterModule } from '@angular/router';
import { ThemeManagerComponent } from './theme-manager/theme-manager.component';
import { HomeComponent } from './templates/pages/home/home.component';
import { BlogComponent } from './templates/pages/blog/blog.component';
import { CustomPageComponent } from './templates/pages/custom-page/custom-page.component';

export const routes: Routes = [
  {
    path: 'editor',
    component: ThemeManagerComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: '/editor/(pages:pages/home)'},
      {path: 'pages/home', component: HomeComponent, outlet: 'pages'},
      {path: 'pages/blog', component: BlogComponent, outlet: 'pages'},
      {path: 'pages/:link', component: CustomPageComponent, outlet: 'pages'},
    ]
  }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forChild(routes);
