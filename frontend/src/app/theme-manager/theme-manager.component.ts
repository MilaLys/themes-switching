import { Component, OnInit } from '@angular/core';
import { THEMES_ID } from '../themes';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../models/theme.interface';
import { User } from '../models/user.interface';
import { CurrentTheme } from '../models/current-theme.interface';
import { CurrentConfig } from '../models/current-config';
import {Page} from '../models/page.interface';

@Component({
  selector: 'app-theme-manager',
  templateUrl: './theme-manager.component.html',
  styleUrls: ['./theme-manager.component.css']
})

export class ThemeManagerComponent implements OnInit {
  componentData = null;
  newMenuItem: string;
  link: string;
  themes: Theme[] = [];
  currentUser: User;
  currentTheme: CurrentTheme = {_id: null, themeId: null, userId: null};
  currentConfig: CurrentConfig;
  isVisibleMenu;
  isVisibleLogo;
  theme = {logoName: '', isVisibleLogo: this.isVisibleLogo, isVisibleMenu: this.isVisibleMenu, menuItems: [], pages: []};
  page: Page = {link: '', title: '', content: ''};

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getThemes();
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
      this.theme.isVisibleLogo = data.isVisibleLogo;
      this.theme.isVisibleMenu = data.isVisibleMenu;
      this.theme.logoName = data.logoName;
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
    this.theme.menuItems.length = 0;
    this.themeService.updateUserTheme(this.currentUser._id, this.currentTheme.themeId);
  }

  changeVisibleMenu() {
    this.themeService.visibleMenu.emit(this.theme.isVisibleMenu);
  }

  changeVisibleLogo() {
    this.themeService.visibleLogo.emit(this.theme.isVisibleLogo);
  }

  changeLogoName() {
    this.themeService.changeLogoName.emit(this.theme.logoName);
  }

  addMenuItem() {
    this.theme.menuItems.push({name: this.newMenuItem, link: this.link});
    this.themeService.addMenuItem.emit(this.newMenuItem);
  }

  addMenuItemLink(link) {
    // 1) show list of available pages
    // 2) choose page
    // 3) get link of this page
    // 4) put this link to routes
    this.link = link;
  }

  applyTheme(id) {
    this.themeService.currentTheme.themeId = id;
    this.componentData = {
      component: THEMES_ID[id],
      inputs: {}
    };
  }

  addPage() {
    this.theme.pages.push(this.page);
  }

  // addPage() {
  //   this.themeService.addPage(this.page, (err, data) => {
  //    // this.pages.push(data.page);
  //     this.page = {link: '', title: '', content: ''};
  //   });
  // }
}

