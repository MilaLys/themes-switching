import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DynamicComponentFactory } from './dynamic-component-factory/dynamic-component-factory.component';
import { THEMES, THEMES_COMPONENT } from './themes';
import { ThemeModule } from './themes/theme.module';
import { FormsModule } from '@angular/forms';
import { HttpService } from './services/http.service';
import { XHRBackend, RequestOptions } from '@angular/http';
import { ThemeService } from './services/theme.service';
import { ThemeManagerComponent } from './theme-manager/theme-manager.component';
import { HomeComponent } from './templates/pages/home/home.component';
import { BlogComponent } from './templates/pages/blog/blog.component';
import {appRoutingProviders, routing} from './app.routes';
import { CustomPageComponent } from './templates/pages/custom-page/custom-page.component';

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions): any {
  return new HttpService(backend, defaultOptions);
}

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponentFactory,
    ThemeManagerComponent,
    HomeComponent,
    BlogComponent,
    CustomPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    ThemeModule.withComponents([
      THEMES,
      THEMES_COMPONENT
    ])
  ],
  providers: [
    ThemeService,
    appRoutingProviders,
    {
      provide: HttpService,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
