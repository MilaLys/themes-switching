import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { THEMES, THEMES_COMPONENT } from './themes';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ThemeComponent } from './theme.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  declarations: [
    THEMES,
    THEMES_COMPONENT,
    ThemeComponent
  ],
  exports: [THEMES, THEMES_COMPONENT, ThemeComponent]
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
