import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {THEMES, THEMES_ID} from './themes';
import {DefaultThemeComponent} from './default-theme/default-theme.component';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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

  getOneTheme(id) {
    this.themeService.getOneTheme(id).subscribe(data => {
      this.oneTheme = data;
    });
  }

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

  // createFirstThemeComponent() {
  //   this.componentData = {
  //     component: THEMES[0], // ???
  //     inputs: {}
  //   };
  // }

  showTheme(id, themeId) {
    this.componentData = {
      component: THEMES_ID[themeId], // ???
      inputs: {}
    };

    // return this.themeService.getOneTheme(id).subscribe(data => {
    //   this.oneTheme = data;
    // });
    console.log(this.themeService.oneTheme);
    return this.themeService.oneTheme;
  }
}
