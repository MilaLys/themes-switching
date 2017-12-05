import {Component, OnInit} from '@angular/core';
import {THEMES} from './themes';
import {DefaultThemeComponent} from './default-theme/default-theme.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-outlet-component [componentData]="componentData"></app-outlet-component>
      <button (click)="createDefaultThemeComponent()">Default Theme</button>
      <button (click)="createFirstThemeComponent()">First Theme</button>
      <hr/>
      <button #detail (click)="detail.value = true;">HEADER</button>
      <button>FOOTER</button>
      <div *ngIf="detail.value">
        <h2>Menu</h2>
        <input type="checkbox" id="show"/>
        <label for="show">Show</label>
        <br/>
        <input type="checkbox" id="home"/>
        <label>Hide</label>
      </div>
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
