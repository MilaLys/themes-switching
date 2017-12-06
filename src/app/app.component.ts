import {Component, OnInit, Input} from '@angular/core';
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
      <button (click)="detail = !detail">HEADER</button>
      <!-- <button (click)="footerDetail = !footerDetail">FOOTER</button>-->
      <div *ngIf="detail">
        <h2>Menu</h2>
        <!-- <input type="checkbox" id="show" [checked]="showenMenu" (change)="showenMenu = !showenMenu;"/>
         <label for="show">Show Menu</label>
         <br/>-->
        <input type="checkbox"
               id="home"
               [checked]="hiddenMenu"
               (change)="hiddenMenu = !hiddenMenu;"
        />
        <label>Hide Menu</label>
      </div>
      <!-- <div *ngIf="footerDetail">
         <input type="checkbox" id="show"/>
         <label for="show">Show Footer</label>
         <br/>
         <input type="checkbox" id="home"/>
         <label>Hide Footer</label>
       </div>-->
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  componentData = null;
  detail = false;
  /*footerDetail = false;
   showenMenu = true;*/
  hiddenMenu: boolean;

  constructor() {
  }

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
