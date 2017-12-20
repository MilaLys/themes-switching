import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {THEMES} from './themes';
import {DefaultThemeComponent} from './default-theme/default-theme.component';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  componentData = null;
  hiddenMenu = false;
  newItem = '';
  otherMenu = false;
  name: string;
  isVisibleMenu: boolean;
  isVisibleLogo: boolean;
  theme = {name: '', isVisibleLogo: this.isVisibleLogo, isVisibleMenu: this.isVisibleMenu};

  constructor(private themeService: ThemeService) {
  }

  updateThemeConfig(theme) {
    this.themeService.updateThemeConfig(this.themeService.theme[0]._id, {
      name: this.theme.name,
      isVisibleLogo: this.theme.isVisibleLogo,
      isVisibleMenu: this.theme.isVisibleMenu
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  changeVisibleMenu() {
    this.themeService.visibleMenu.emit(this.isVisibleMenu);
  }

  changeVisibleLogo() {
    this.themeService.visibleLogo.emit(this.isVisibleLogo);
  }

  changedLogoName() {
    this.themeService.changeLogoName.emit(this.name);
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
