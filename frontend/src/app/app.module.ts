import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {OutletComponentComponent} from './outlet-component/outlet-component.component';
import {DefaultThemeComponent} from './default-theme/default-theme.component';
import {THEMES} from './themes';
import {ThemeModule} from './themes/theme.module';
import {FormsModule} from '@angular/forms';
import {DefaultHeaderComponent} from './default-theme/header/header.component';
import {MenuComponent} from './default-theme/header/menu/menu.component';
import {HttpService} from './services/http.service';
import {XHRBackend, RequestOptions} from '@angular/http';
import {ThemeService} from './services/theme.service';


export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions): any {
  return new HttpService(backend, defaultOptions);
}

@NgModule({
  declarations: [
    AppComponent,
    OutletComponentComponent,
    DefaultThemeComponent,
    DefaultHeaderComponent,
    MenuComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ThemeModule.withComponents([
      THEMES
    ])
  ],
  providers: [
    ThemeService,
    {
      provide: HttpService,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
