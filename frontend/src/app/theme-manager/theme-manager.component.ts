import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {DefaultThemeComponent} from '../themes/default-theme/default-theme.component';
import {THEMES_ID} from '../themes';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-theme-manager',
  templateUrl: './theme-manager.component.html',
  styleUrls: ['./theme-manager.component.css']
})

export class ThemeManagerComponent implements OnInit {
  componentData = null;
  newItem = '';
  otherMenu = false;
  oneTheme: object = {};
  isVisibleMenu = true;
  isVisibleLogo = true;
  theme = {logoName: '', isVisibleLogo: this.isVisibleLogo, isVisibleMenu: this.isVisibleMenu};
  themes = [];
  logoName = '';

  constructor(private themeService: ThemeService) {
  }

  getThemes() {
    this.themeService.getThemes().subscribe(data => {
      this.themes = data;
    });
  }

  updateThemeConfig(theme) {
    this.themeService.updateThemeConfig(this.themeService.themes[2]._id, { // themes[2] - default theme
      logoName: this.theme.logoName,
      isVisibleLogo: this.theme.isVisibleLogo,
      isVisibleMenu: this.theme.isVisibleMenu
    }).subscribe(data => {
      this.themeService.themes = this.theme;
      this.logoName = this.theme.logoName;
    }, error => {
      console.log(error);
    });
    this.theme.logoName = '';
    console.log(this.theme.isVisibleLogo, this.theme.isVisibleMenu, this.theme.logoName);
    alert('Changes were saved succeed!');
  }

  changeVisibleMenu() {
    this.themeService.visibleMenu.emit(this.isVisibleMenu);
  }

  changeVisibleLogo() {
    this.themeService.visibleLogo.emit(this.isVisibleLogo);
  }

  changedLogoName() {
    this.themeService.changeLogoName.emit(this.theme.logoName);
  }

  addMenuItem(item: string) {
    this.themeService.addMenuItem.emit(this.newItem);
  }

  setMenu() {
    this.themeService.altMenu.emit(this.otherMenu);
  }

  ngOnInit() {
    this.applyTheme(0); // theme_id from user
    this.getThemes();
  }

  applyTheme(id) {
    this.themeService.getOneTheme(id).subscribe(data => {
      this.oneTheme = data.theme;
      this.componentData = {
        component: THEMES_ID[id], // ???
        inputs: {}
      };
    });
  }
}
