import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './templates/pages/home/home.component';
import {BlogComponent} from './templates/pages/blog/blog.component';
import {CustomPageComponent} from './templates/pages/custom-page/custom-page.component';
import {CodeEditorComponent} from './templates/pages/code-editor/code-editor.component';

export const routes: Routes = [
  {path: '', redirectTo: 'pages/home', pathMatch: 'full'},
  {path: 'pages/home', component: HomeComponent},
  {path: 'pages/blog', component: BlogComponent},
  {path: 'pages/:link', component: CustomPageComponent},
  {path: 'themes/code-editor', component: CodeEditorComponent}
  // {path: '**', component: PageNotFoundComponent}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, {useHash: true});
