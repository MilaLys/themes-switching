import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {THEMES_ID} from '../themes';
import {ThemeService} from '../services/theme.service';
import {Theme} from '../models/theme.interface';
import {User} from '../models/user.interface';
import {CurrentTheme} from '../models/current-theme.interface';
import {CurrentConfig} from '../models/current-config';
import {Page} from '../models/page.interface';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-theme-manager',
  templateUrl: './theme-manager.component.html',
  styleUrls: ['./theme-manager.component.css']
})

export class ThemeManagerComponent implements OnInit {
  componentData = null;
  newMenuItem: string;
  newMenuItemLink = 'Choose page';
  themes: Theme[] = [];
  currentUser: User;
  currentTheme: CurrentTheme = {_id: null, themeId: null, userId: null};
  currentConfig: CurrentConfig;
  isVisibleMenu;
  isVisibleLogo;
  templateName = 'Choose template';
  configs;
  page: Page = {title: '', content: '', link: '', templateName: this.templateName};
  theme = {
    logoName: '',
    isVisibleLogo: this.isVisibleLogo,
    isVisibleMenu: this.isVisibleMenu,
    menuItems: [],
    pages: {}
  };

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getThemes();
    // this.getAllConfigs();

  }

  getAllConfigs() {
    // this.themeService.getAllConfigs().subscribe(data => {
    //   this.configs = data;
    //   console.log(this.configs);
    // });
  }

  getCurrentUser() {
    this.themeService.getCurrentUser().subscribe(data => {
      this.currentUser = data;
      this.getUserTheme(this.currentUser._id);
    });
  }

  getUserTheme(currentUserId) {
    this.themeService.getUserTheme(currentUserId).subscribe(data => {
      this.currentTheme = data;
      this.getUserConfig(currentUserId);
    });
  }

  getUserConfig(currentUserId) {
    this.themeService.getUserConfig(currentUserId).subscribe(data => {
      this.currentConfig = data;
      this.theme.isVisibleLogo = data.config.isVisibleLogo;
      this.theme.isVisibleMenu = data.config.isVisibleMenu;
      this.theme.logoName = data.config.logoName;
      this.theme.pages = data.config.pages || {};
      this.applyTheme(this.currentTheme.themeId);
    });
  }

  getThemes() {
    this.themeService.getThemes().subscribe(data => {
      this.themes = data;
    });
  }

  updateUserConfig() {
    this.themeService.updateUserConfig(this.currentUser._id, this.theme);
    console.log(this.theme);
    this.theme.menuItems.length = 0;
    this.themeService.updateUserTheme(this.currentUser._id, this.currentTheme.themeId);
    alert('Your changes saved successfully!');
  }

  changeVisibleMenu() {
    this.currentConfig.config.isVisibleMenu = this.theme.isVisibleMenu;
    this.themeService.visibleMenu.emit(this.theme.isVisibleMenu);
  }

  changeVisibleLogo() {
    this.currentConfig.config.isVisibleLogo = this.theme.isVisibleLogo;
    this.themeService.visibleLogo.emit(this.theme.isVisibleLogo);
  }

  changeLogoName() {
    this.currentConfig.config.logoName = this.theme.logoName;
    this.themeService.changeLogoName.emit(this.theme.logoName);
  }

  addMenuItem() {
    this.theme.menuItems.push({name: this.newMenuItem, link: this.newMenuItemLink});
    this.themeService.addMenuItem.emit(this.newMenuItem);
    alert(`Menu item: "${this.newMenuItem}" is added! For save changes push "Save changes" button!`);
    this.newMenuItem = '';
    this.newMenuItemLink = '';
  }

  applyTheme(id) {
    this.themeService.currentTheme.themeId = id;
    this.componentData = {
      component: THEMES_ID[id],
      inputs: {
        theme: this.theme
      }
    };
  }

  applyTemplate() {
    this.themeService.applyTemplate.emit(this.page.templateName);
  }

  addPage() {
    this.theme.pages[this.page.link] = {content: this.page.content, title: this.page.title, templateName: this.page.templateName};
  }
}

@Pipe({name: 'keys', pure: false})
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    if (!value) {
      return;
    }
    return Object.keys(value);
  }
}

