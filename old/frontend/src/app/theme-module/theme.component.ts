import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'themes',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  themes;
  theme;
  user;
  currentTheme;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.getCurrentTheme();
  }

  getCurrentTheme() {
    this.themeService.currentTheme.subscribe(info => {
      this.themeService.themes.subscribe(data => {
        this.themes = data;
        if (!data || !info) {
          return;
        }
        this.theme = info;
        this.currentTheme = this.themes.filter((obj) => obj['id'] === this.theme.themeId)[0];
      });
    });
  }

  publishTheme(id: number) {
    this.themeService.currentUser.subscribe(data => {
      this.user = data._id;
      this.themeService.updateUserTheme(this.user, id);
    });
  }
}
