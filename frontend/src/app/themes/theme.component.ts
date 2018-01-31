import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../models/theme.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'themes',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  themes: Theme[] = [];

  constructor(private themeService: ThemeService, private router: Router) {
  }

  ngOnInit() {
    this.getThemes();
  }

  getThemes() {
    this.themeService.getThemes().subscribe(data => {
      this.themes = data;
    });
  }

  goToEditor() {
    // this.isVisible = false;
    this.router.navigate(['/themes/code-editor']);
  }
}
