import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { User } from "./customize-module/models/user.interface";
import { CurrentConfig } from './customize-module/models/current-config';
import { CurrentTheme } from './customize-module/models/current-theme.interface';
import { Theme } from './customize-module/models/theme.interface';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})

export class AppComponent {
  currentUser: User;
  currentConfig: CurrentConfig;
  currentTheme: CurrentTheme;
  themes: Theme[];

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.themeService.getCurrentUser().subscribe(data => {
      if (!data) {
        return;
      }
      this.currentUser = data;
      this.themeService.getUserConfig(this.currentUser._id).subscribe(data => {
        if (!data) {
          return;
        }
        this.currentConfig = data;
      });
      this.themeService.getUserTheme(this.currentUser._id).subscribe(data => {
        if (!data) {
          return;
        }
        this.currentTheme = data;
      });
      this.themeService.getThemes().subscribe(data => {
        if (!data) {
          return;
        }
        this.themes = data;
      })
    });
  }
}
