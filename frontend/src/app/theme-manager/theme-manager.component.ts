import { Component, OnInit } from '@angular/core';
import { THEMES_ID } from '../themes';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../models/theme.interface';
import { User } from '../models/user.interface';
import { CurrentTheme } from '../models/current-theme.interface';
import { CurrentConfig } from '../models/current-config';

@Component({
  selector: 'app-theme-manager',
  templateUrl: './theme-manager.component.html',
  styleUrls: ['./theme-manager.component.css']
})

export class ThemeManagerComponent implements OnInit {
  componentData = null;
  newMenuItem: string;
  newMenuItemLink: '';
  themes: Theme[] = [];
  currentUser: User;
  currentTheme: CurrentTheme = {_id: null, themeId: null, userId: null};
  currentConfig: CurrentConfig;
  isVisibleMenu;
  isVisibleLogo;
  theme = {logoName: '', isVisibleLogo: this.isVisibleLogo, isVisibleMenu: this.isVisibleMenu, menuItems: [], content: {'/app-home': 'home'}};

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
      this.theme.content = data.content;
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
    this.theme.menuItems.push(this.newMenuItem);
    this.themeService.addMenuItem.emit(this.newMenuItem);
  }

  applyTheme(id) {
    this.themeService.currentTheme.themeId = id;
    this.componentData = {
      component: THEMES_ID[id],
      inputs: {}
    };
  }
}
