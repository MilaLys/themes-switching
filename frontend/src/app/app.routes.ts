import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './templates/pages/home/home.component';
import { BlogComponent } from './templates/pages/blog/blog.component';
import {CustomPageComponent} from './templates/pages/custom-page/custom-page.component';

export const routes: Routes = [
  {path: '', redirectTo: 'pages', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'pages/:link', component: CustomPageComponent}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);
