import {NgModule, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { THEMES, THEMES_COMPONENT } from '../themes';
import { HttpModule } from '@angular/http';
import {HttpService} from '../services/http.service';
import {ThemeService} from '../services/theme.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [HttpService, ThemeService],
  declarations: [THEMES, THEMES_COMPONENT],
  exports: [THEMES, THEMES_COMPONENT]
})
export class ThemeModule {
  static withComponents(components: any[]) {
    return {
      ngModule: ThemeModule,
      providers: [
        {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
      ]
    };
  }
}
