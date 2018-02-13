import {Component} from '@angular/core';
import {ThemeService} from '../customize-module/services/theme.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: '<admin-panel>',
  template: `
    <div class="container-fluid">
      <div class="row" style="display: flex;min-height: 100vh;">
        <div class="col-3 alert-dark">
          <div class="list-group list-group-flush">
            <a class="list-group-item list-group-item-action"
               routerLink="/editor"
               routerLinkActive="list-group-item-dark">
              <i class="fas fa-eye"></i>
              Online App
            </a>
            <a class="list-group-item list-group-item-action"
               routerLink="/admin"
               routerLinkActive="list-group-item-dark">Themes</a>
            <a class="list-group-item list-group-item-action disabled"
               routerLinkActive="list-group-item-dark">Blog</a>
            <a class="list-group-item list-group-item-action disabled"
               routerLinkActive="list-group-item-dark">Pages</a>
            <a class="list-group-item list-group-item-action disabled"
               routerLinkActive="list-group-item-dark">Navigation</a>
            <a class="list-group-item list-group-item-action disabled"
               routerLinkActive="list-group-item-dark">Preferences</a>
          </div>
        </div>
        <div class="col-9">
          <router-outlet name="admin"></router-outlet>
        </div>
      </div>
    </div>`
})

export class AdminNavigationComponent {
  currentTheme;
  user;
  themes;
  theme;

  constructor(private router: Router, private themeService: ThemeService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // this.router.navigate(['/admin', {outlets: {'admin': 'themes'}}]);
    this.gotToThemes();
  }

  gotToThemes() {
    //this.router.navigate(['/admin', {outlets: {'admin': 'themes'}}]);
  }
  // getCurrentTheme() {
  //   this.themeService.getCurrentUser().subscribe(data => {
  //     this.user = data._id;
  //     this.themeService.getUserTheme(this.user).subscribe(info => {
  //       this.theme = info;
  //       this.currentTheme = this.themes[this.theme.themeId];
  //     });
  //   });
  // }
}
