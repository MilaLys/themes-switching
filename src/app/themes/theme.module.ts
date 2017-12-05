import {NgModule, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {THEMES, THEMES_COMPONENT} from '../themes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [THEMES, THEMES_COMPONENT],
  exports: [THEMES]
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
