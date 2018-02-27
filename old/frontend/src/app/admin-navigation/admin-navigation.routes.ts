import { Routes, RouterModule } from '@angular/router';
import { AdminNavigationComponent } from './admin-navigation.component';
import { ThemeComponent } from '../theme-module/theme.component';
import { CodeEditorComponent } from '../customize-module/templates/pages/code-editor/code-editor.component';

export const routes: Routes = [
  {
    path: 'admin', // CAUTION: In order for the NAMED OUTLET child route to work (chat), its parent segment must contain a non-empty path.
    component: AdminNavigationComponent,
    children: [
      // {path: '', pathMatch: 'full', redirectTo: 'themes'},
      // {path: '', pathMatch: 'full', redirectTo: '/admin/(admin:admin/themes)'},
      {path: '', component: ThemeComponent, outlet: 'admin'},
      {path: 'code-editor', component: CodeEditorComponent, outlet: 'admin'}
    ],
  }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forChild(routes);
