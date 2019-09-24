import { Component } from '@angular/core';

@Component({
  selector: '<admin-panel>',
  template: `
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-lg-3 col-sm-3 col-12 alert-dark">
          <div class="list-group list-group-flush">
            <a class="list-group-item list-group-item-action"
               routerLink="/editor"
               routerLinkActive="list-group-item-dark">
              <!--<i class="fas fa-eye"></i>-->
              Customize theme
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
        <div class="col-lg-9 col-sm-9 col-12">
          <router-outlet name="admin"></router-outlet>
        </div>
      </div>
    </div>`
})

export class AdminNavigationComponent {
  user;
  themes;
  theme;

  constructor() {
  }

  ngOnInit() {
  }
}
