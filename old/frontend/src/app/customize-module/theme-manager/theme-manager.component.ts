import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { THEMES_ID } from '../../theme-module/themes';
import { User } from '../models/user.interface';
import { CurrentTheme } from '../models/current-theme.interface';
import { CurrentConfig } from '../models/current-config';
import { Page } from '../models/page.interface';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-manager',
  templateUrl: './theme-manager.component.html',
  styleUrls: ['./theme-manager.component.css']
})

export class ThemeManagerComponent implements OnInit {
  componentData = null;
  newMenuItem: string;
  newMenuItemLink = 'Choose page';
  currentUser: User;
  currentTheme: CurrentTheme = {_id: null, themeId: null, userId: null};
  currentConfig: CurrentConfig;
  isVisibleMenu;
  isVisibleLogo;
  templateName = 'Choose template';
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
  }

  getCurrentUser() {
    this.themeService.currentUser.subscribe(data => {
        if (!data) {
          return;
        }
        this.currentUser = data;
        this.getUserTheme(this.currentUser._id);
      }
    );
  }

  getUserTheme(currentUserId) {
    this.themeService.getUserTheme(currentUserId).subscribe(data => {
      this.currentTheme = data;
      this.getUserConfig(currentUserId);
    });
  }

  getUserConfig(currentUserId: string) {
    this.themeService.getUserConfig(currentUserId).subscribe(data => {
      this.currentConfig = data;
      this.theme.isVisibleLogo = data.isVisibleLogo;
      this.theme.isVisibleMenu = data.isVisibleMenu;
      this.theme.logoName = data.logoName;
      this.theme.pages = data.pages || {};
      this.theme.menuItems = data.menuItems || [];
      this.applyTheme(this.currentTheme.themeId);
    });
  }

  updateUserConfig() {
    this.themeService.updateUserConfig(this.currentUser._id, this.theme);
    this.themeService.updateUserTheme(this.currentUser._id, this.currentTheme.themeId);
    alert('Your changes saved successfully!');
  }

  changeVisibleMenu() {
    this.currentConfig.isVisibleMenu = this.theme.isVisibleMenu;
    this.themeService.visibleMenu.emit(this.theme.isVisibleMenu);
  }

  changeVisibleLogo() {
    this.currentConfig.isVisibleLogo = this.theme.isVisibleLogo;
    this.themeService.visibleLogo.emit(this.theme.isVisibleLogo);
  }

  changeLogoName() {
    this.currentConfig.logoName = this.theme.logoName;
    this.themeService.changeLogoName.emit(this.theme.logoName);
  }

  addMenuItem() {
    this.theme.menuItems.push({name: this.newMenuItem, link: this.newMenuItemLink});
    this.themeService.addMenuItem.emit(this.newMenuItem);
    alert(`Menu item: "${this.newMenuItem}" is added! For save changes push "Save changes" button!`);
    this.newMenuItem = '';
    this.newMenuItemLink = '';
  }

  applyTheme(id: number) {
    this.currentTheme.themeId = id;
    this.componentData = {
      component: THEMES_ID[id],
      inputs: {
        theme: this.theme
      }
    };
  }

  addPage() {
    this.theme.pages[this.page.link] = {
      content: this.page.content,
      title: this.page.title,
      templateName: this.page.templateName
    };
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
