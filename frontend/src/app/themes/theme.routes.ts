import {Routes, RouterModule} from '@angular/router';
import { ThemeComponent } from './theme.component';
import { ThemeManagerComponent } from '../theme-manager/theme-manager.component';

export const routes: Routes = [
  {path: '', redirectTo: 'admin/themes', pathMatch: 'full'},
  {path: 'admin/themes', component: ThemeComponent},
  {path: 'admin/themes/editor', component: ThemeManagerComponent}
];

export const themeRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, {useHash: true});
