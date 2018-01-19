import {NgModule, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { THEMES, THEMES_COMPONENT } from '../themes';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../templates/pages/home/home.component';
import {BlogComponent} from '../templates/pages/blog/blog.component';
import {CustomPageComponent} from '../templates/pages/custom-page/custom-page.component';
import {BasicTemplateComponent} from '../templates/pages/custom-page/basic-template/basic-template.component';
import {ContactsTemplateComponent} from '../templates/pages/custom-page/contacts-template/contacts-template.component';
import {CustomContentComponent} from '../templates/pages/custom-page/custom-content.component';
import {DynamicComponentsContainerDirective} from '../dynamic-components-container.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  providers: [],
  declarations: [
    THEMES,
    THEMES_COMPONENT,
    HomeComponent,
    BlogComponent,
    CustomPageComponent,
    BasicTemplateComponent,
    ContactsTemplateComponent,
    CustomContentComponent
  ],
  exports: [THEMES, THEMES_COMPONENT, BasicTemplateComponent, ContactsTemplateComponent]
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
