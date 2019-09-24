import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'admin',
  //   loadChildren: '../admin-navigation/admin-navigation.module'
  // },
  // {
  //   path: 'editor',
  //   loadChildren: '../customize-module/customize-module.module'
  // },
  {
    path: '**',
    redirectTo: 'admin'
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, {useHash: true});
