import {Routes, RouterModule} from '@angular/router';
import {CodeEditorComponent} from './customize-module/templates/pages/code-editor/code-editor.component';
import {ThemeManagerComponent} from './customize-module/theme-manager/theme-manager.component';
import {ThemeComponent} from './theme-module/theme.component';
import {AdminNavigationComponent} from './admin-navigation/admin-navigation.component';
import {CustomPageComponent} from './customize-module/templates/pages/custom-page/custom-page.component';
import {BlogComponent} from './customize-module/templates/pages/blog/blog.component';
import {HomeComponent} from './customize-module/templates/pages/home/home.component';

export const routes: Routes = [
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {
    path: 'admin',
    component: AdminNavigationComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'themes'},
      {path: 'themes', component: ThemeComponent, outlet: 'admin'},
      {path: 'code-editor', component: CodeEditorComponent, outlet: 'admin'},
    ]
  },
  {
    path: 'editor',
    component: ThemeManagerComponent,
    children: [
      {path: 'pages/home', component: HomeComponent, outlet: 'pages'},
      {path: 'pages/blog', component: BlogComponent, outlet: 'pages'},
      {path: 'pages/:link', component: CustomPageComponent, outlet: 'pages'},
    ]
  },

  {path: '**', redirectTo: 'admin/themes'}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, {useHash: true});
