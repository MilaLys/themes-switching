import { Component, OnInit } from '@angular/core';
/*import {FirstThemeComponent} from './first-theme/first-theme.component';*/
import {THEMES} from './themes';
import {DefaultThemeComponent} from './default-theme/default-theme.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-outlet-component [componentData]="componentData"></app-outlet-component>
      <button (click)="createDefaultThemeComponent()">Default Theme</button>
      <button (click)="createFirstThemeComponent()">First Theme</button>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  componentData = null;

  ngOnInit() {
    this.createDefaultThemeComponent();
  }

  createDefaultThemeComponent() {
    this.componentData = {
      component: DefaultThemeComponent,
      inputs: {}
    };
  }

  createFirstThemeComponent() {
    this.componentData = {
      component: THEMES[0], // ???
      inputs: {}
    };
  }
}
