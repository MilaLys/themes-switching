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
import {KeysPipe, ThemeManagerComponent} from './theme-manager/theme-manager.component';
import {appRoutingProviders, routing} from './app.routes';
import {ContactsTemplateComponent} from './templates/pages/custom-page/contacts-template/contacts-template.component';
import {BasicTemplateComponent} from './templates/pages/custom-page/basic-template/basic-template.component';
import {CustomContentComponent} from './templates/pages/custom-page/custom-content.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { CodeEditorComponent } from './templates/pages/code-editor/code-editor.component';

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions): any {
  return new HttpService(backend, defaultOptions);
}

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponentFactory,
    ThemeManagerComponent,
    KeysPipe,
    CodeEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    AceEditorModule,
    ThemeModule.withComponents([
      THEMES,
      THEMES_COMPONENT,
      BasicTemplateComponent, ContactsTemplateComponent, CustomContentComponent
    ])
  ],
  entryComponents: [THEMES, BasicTemplateComponent, ContactsTemplateComponent],
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
