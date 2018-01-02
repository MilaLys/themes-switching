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
  newItem = '';
  isVisibleMenu = true;
  isVisibleLogo = true;
  theme: Theme = {logoName: '', isVisibleLogo: this.isVisibleLogo, isVisibleMenu: this.isVisibleMenu};
  themes: Theme[] = [];
  currentUser: User;
  currentTheme: CurrentTheme = {_id: null, themeId: null, userId: null};
  currentConfig: CurrentConfig;

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

  addMenuItem(item: string) {
    // this.themeService.addMenuItem.emit(this.newItem);
  }

  setMenu() {
    // this.themeService.altMenu.emit(this.otherMenu);
  }

  applyTheme(id) {
    this.themeService.currentTheme.themeId = id;
    this.componentData = {
      component: THEMES_ID[id],
      inputs: {}
    };
  }
}
