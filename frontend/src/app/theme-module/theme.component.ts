import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from '../customize-module/models/theme.interface';
import { ThemeService } from '../customize-module/services/theme.service';

@Component({
  selector: 'themes',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  themes: Theme[] = [];
  theme;
  user;
  currentTheme;

  constructor(private themeService: ThemeService, private router: Router) {
  }

  ngOnInit() {
    this.getThemes();
    this.getCurrentTheme();
  }

  getThemes() {
    this.themeService.getThemes().subscribe(data => {
      this.themes = data;
    });
  }

  getCurrentTheme() {
    this.themeService.getCurrentUser().subscribe(data => {
      this.user = data._id;
      this.themeService.getUserTheme(this.user).subscribe(info => {
        this.theme = info;
        this.currentTheme = this.themes.filter((obj) => obj['id'] === this.theme.themeId)[0];
      });
    });
  }

  publishTheme(id) {
    this.themeService.getCurrentUser().subscribe(data => {
      this.user = data._id;
      this.themeService.updateUserTheme(this.user, id);
    });
  }

  goToEditor() {
    // this.isVisible = false;
    this.router.navigate(['/themes/code-editor']);
  }
}
