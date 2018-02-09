import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RequestOptions, XHRBackend} from '@angular/http';
import {HttpService} from './customize-module/services/http.service';
import {ThemeManagerComponent} from './customize-module/theme-manager/theme-manager.component';
import {FormsModule} from '@angular/forms';
import {appRoutingProviders, routing} from './app.routes';
import {BasicTemplateComponent} from './customize-module/templates/pages/custom-page/basic-template/basic-template.component';
import {ContactsTemplateComponent} from './customize-module/templates/pages/custom-page/contacts-template/contacts-template.component';
import {CustomContentComponent} from './customize-module/templates/pages/custom-page/custom-content.component';
import {ThemeService} from './customize-module/services/theme.service';
import {AppComponent} from './app.component';
import {CustomizeModule} from './customize-module/customize.module';
import {HomeComponent} from './customize-module/templates/pages/home/home.component';
import {CustomPageComponent} from './customize-module/templates/pages/custom-page/custom-page.component';
import {BlogComponent} from './customize-module/templates/pages/blog/blog.component';
import {ThemeModule} from './theme-module/theme.module';
import {ThemeComponent} from './theme-module/theme.component';
import {CustomizeComponent} from './customize-module/customize.component';
import {AdminNavigationModule} from './admin-navigation/admin-navigation.module';
import {AdminNavigationComponent} from './admin-navigation/admin-navigation.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions): any {
  return new HttpService(backend, defaultOptions);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AdminNavigationModule.withComponents([
      AdminNavigationComponent
    ]),
    CustomizeModule.withComponents([
      ThemeManagerComponent,
      HomeComponent,
      BlogComponent,
      BasicTemplateComponent,
      ContactsTemplateComponent,
      CustomContentComponent,
      CustomPageComponent,
      CustomizeComponent
    ]),
    ThemeModule.withComponents([
      ThemeComponent
    ]),
    CommonModule,
    routing
  ],
  entryComponents: [],
  providers: [
    ThemeService,
    appRoutingProviders,
    {
      provide: HttpService,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})

export class AppModule {
}
