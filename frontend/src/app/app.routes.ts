import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './templates/pages/home/home.component';
import { BlogComponent } from './templates/pages/blog/blog.component';
import {CustomPageComponent} from './templates/pages/custom-page/custom-page.component';

export const routes: Routes = [
  {path: '', redirectTo: 'app-home', pathMatch: 'full'},
  {path: 'app-home', component: HomeComponent},
  {path: 'app-blog', component: BlogComponent},
  {path: 'app-custom-page', component: CustomPageComponent}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);
