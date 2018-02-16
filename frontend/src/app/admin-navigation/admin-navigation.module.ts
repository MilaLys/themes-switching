import { ANALYZE_FOR_ENTRY_COMPONENTS, NgModule } from '@angular/core';
import { AdminNavigationComponent } from './admin-navigation.component';
import { RouterModule } from '@angular/router';
import { appRoutingProviders, routing } from './admin-navigation.routes';

@NgModule({
  declarations: [AdminNavigationComponent],
  imports: [
    routing
  ],
  providers: [appRoutingProviders],
  exports: [
    AdminNavigationComponent,
    RouterModule
  ]
})

export class AdminNavigationModule {
  static withComponents(components: any[]) {
    return {
      ngModule: AdminNavigationModule,
      providers: [
        {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
      ]
    };
  }
}
