import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {OutletComponentComponent} from './outlet-component/outlet-component.component';
import {DefaultThemeComponent} from './default-theme/default-theme.component';
import {THEMES} from './themes';

@NgModule({
  declarations: [
    AppComponent,
    OutletComponentComponent,
    DefaultThemeComponent,
    /*FirstThemeComponent*/
    THEMES
  ],
  entryComponents: [
    OutletComponentComponent,
    DefaultThemeComponent,
   /* FirstThemeComponent*/
    THEMES
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
