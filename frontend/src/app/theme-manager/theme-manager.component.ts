import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {DefaultThemeComponent} from '../default-theme/default-theme.component';
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
  name: string;
  oneTheme: object = {};
  isVisibleMenu: boolean;
  isVisibleLogo: boolean;
  theme = {name: '', isVisibleLogo: this.isVisibleLogo, isVisibleMenu: this.isVisibleMenu};
  themes = [];

  constructor(private themeService: ThemeService) {
  }

  getThemes() {
    this.themeService.getThemes().subscribe(data => {
      this.themes = data;
    });
  }

  updateThemeConfig(theme) {
    this.themeService.updateThemeConfig(this.themeService.themes[0]._id, {
      name: this.theme.name,
      isVisibleLogo: this.theme.isVisibleLogo,
      isVisibleMenu: this.theme.isVisibleMenu
    }).subscribe(data => {
      this.themeService.themes = this.theme;
      // this.name = this.theme.name;
    }, error => {
      console.log(error);
    });
    console.log(this.theme.isVisibleLogo, this.theme.isVisibleMenu);
    alert('Changes were saved succeed!');
  }

  changeVisibleMenu() {
    this.themeService.visibleMenu.emit(this.isVisibleMenu);
  }

  changeVisibleLogo() {
    this.themeService.visibleLogo.emit(this.isVisibleLogo);
  }

  // changedLogoName() {
  //   this.themeService.changeLogoName.emit(this.name);
  // }

  addMenuItem(item: string) {
    this.themeService.addMenuItem.emit(this.newItem);
  }

  setMenu() {
    this.themeService.altMenu.emit(this.otherMenu);
  }

  ngOnInit() {
    this.createDefaultThemeComponent();
    this.getThemes();
    this.resetSelectedTheme();
  }

  createDefaultThemeComponent() {
    this.componentData = {
      component: DefaultThemeComponent,
      inputs: {}
    };
  }

  resetSelectedTheme() {


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
