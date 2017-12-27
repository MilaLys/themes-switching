import { Component, OnInit } from '@angular/core';
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
  oneTheme: any;
  isVisibleMenu: boolean;
  isVisibleLogo: boolean;
  theme = {name: '', isVisibleLogo: this.isVisibleLogo, isVisibleMenu: this.isVisibleMenu};
  themes: any;

  constructor(private themeService: ThemeService) {
  }

  getTheme() {
    this.themeService.getTheme().subscribe(data => {
      this.themes = data;
    });
  }

  // getOneTheme(id) {
  //   this.themeService.getOneTheme(id).subscribe(data => {
  //     this.oneTheme = data;
  //   });
  // }

  updateThemeConfig(theme) {
    this.themeService.updateThemeConfig(this.themeService.theme[0]._id, {
      name: this.theme.name,
      isVisibleLogo: this.theme.isVisibleLogo,
      isVisibleMenu: this.theme.isVisibleMenu
    }).subscribe(data => {
      this.themeService.theme = this.theme;
      // this.name = this.theme.name;
    }, error => {
      console.log(error);
    });
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
    this.getTheme();
  }

  createDefaultThemeComponent() {
    this.componentData = {
      component: DefaultThemeComponent,
      inputs: {}
    };
  }

  showTheme(id) {
    this.themeService.getOneTheme(id).subscribe(data => {
      this.oneTheme = data.theme;

      this.componentData = {
        component: THEMES_ID[id], // ???
        inputs: {}
      };
    });
  }

  changeTheme() {
    this.themeService.changeTheme.emit(this.oneTheme);
  }
}
