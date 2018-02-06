import {ANALYZE_FOR_ENTRY_COMPONENTS, NgModule} from '@angular/core';
import {KeysPipe, ThemeManagerComponent} from './theme-manager/theme-manager.component';
import {THEMES, THEMES_COMPONENT} from '../theme-module/themes';
import {CustomContentComponent} from './templates/pages/custom-page/custom-content.component';
import {HomeComponent} from './templates/pages/home/home.component';
import {CustomPageComponent} from './templates/pages/custom-page/custom-page.component';
import {ContactsTemplateComponent} from './templates/pages/custom-page/contacts-template/contacts-template.component';
import {BlogComponent} from './templates/pages/blog/blog.component';
import {BasicTemplateComponent} from './templates/pages/custom-page/basic-template/basic-template.component';
import {ThemeModule} from '../theme-module/theme.module';
import {CodeEditorComponent} from './templates/pages/code-editor/code-editor.component';
import {AceEditorModule} from 'ng2-ace-editor';
import {RouterModule} from '@angular/router';
import {CustomizeComponent} from './customize.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {DynamicComponentFactory} from './dynamic-component-factory/dynamic-component-factory.component';


@NgModule({
  declarations: [
    ThemeManagerComponent,
    HomeComponent,
    BlogComponent,
    CustomPageComponent,
    CodeEditorComponent,
    CustomContentComponent,
    BasicTemplateComponent,
    ContactsTemplateComponent,
    CustomizeComponent,
    DynamicComponentFactory,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AceEditorModule,
    RouterModule,
    ThemeModule.withComponents([
      THEMES,
      THEMES_COMPONENT
    ])],
  providers: [],
  exports: [ThemeManagerComponent, CodeEditorComponent, CustomizeComponent, HomeComponent, CustomPageComponent, CustomContentComponent]
})

export class CustomizeModule {
  static withComponents(components: any[]) {
    return {
      ngModule: CustomizeModule,
      providers: [
        {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
      ]
    };
  }
}
