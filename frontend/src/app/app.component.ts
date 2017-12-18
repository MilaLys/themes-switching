import {Component, OnInit, Input} from '@angular/core';
import {THEMES} from './themes';
import {DefaultThemeComponent} from './default-theme/default-theme.component';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-outlet-component [componentData]="componentData"></app-outlet-component>
      <button (click)="createDefaultThemeComponent()">Default Theme</button>
      <button (click)="createFirstThemeComponent()">First Theme</button>
      <hr/>
      <button (click)="menuDetail = !menuDetail">HEADER</button>
      <div *ngIf="menuDetail;">
        <h2>Menu</h2>
        <input type="checkbox"
               id="menu"
               [checked]="hiddenMenu"
               [(ngModel)]="hiddenMenu"
               (change)="changeVisibleMenu();"
        />
        <label for="menu">Hide Menu</label>
        <h3>Choose menu</h3>
        <input type="checkbox"
               id="otherMenu"
               [checked]="otherMenu"
               [(ngModel)]="otherMenu"
               (change)="setMenu();"
        />
        <label for="otherMenu">Other Menu</label>
        <br/>
        <h3>
          <a href="#" (click)="editMenu = !editMenu">Edit menu</a>
        </h3>
        <div *ngIf="editMenu">
          <input type="text" placeholder="Add menu item" [(ngModel)]="newItem" (keyup.enter)="addMenuItem(newItem);"/>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  componentData = null;
  menuDetail = false;
  hiddenMenu = false;
  editMenu = false;
  newItem = '';
  otherMenu = false;

  constructor(private themeService: ThemeService) {
  }

  changeVisibleMenu() {
    this.themeService.visibleMenu.emit(this.hiddenMenu);
  }

  addMenuItem(item: string) {
    this.themeService.addMenuItem.emit(this.newItem);
  }

  setMenu() {
    this.themeService.altMenu.emit(this.otherMenu);
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
