import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {OutletComponentComponent} from './outlet-component/outlet-component.component';
import {DefaultThemeComponent} from './default-theme/default-theme.component';
import {THEMES} from './themes';
import {ThemeModule} from './themes/theme.module';
import {AppThemeService} from './app-theme.service';
import {FormsModule} from '@angular/forms';
import {DefaultHeaderComponent} from './default-theme/header/header.component';
import {MenuComponent} from './default-theme/header/menu/menu.component';


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
  providers: [AppThemeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
