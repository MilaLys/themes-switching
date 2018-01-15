import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  theme = {isVisibleMenu: false, menuItems: []};

  constructor(private themeService: ThemeService, private router: Router) {
  }

  onClick (path) {
    // this.router.navigate(['/pages', path]);
    // this.themeService.onClick.emit(path);
  }
  ngOnInit() {

    this.theme.isVisibleMenu = this.themeService.currentConfig.isVisibleMenu;

    this.themeService.visibleMenu.subscribe(evt => {
      this.theme.isVisibleMenu = evt;
    }, (error: string) => {
      console.error(error);
    });

    this.theme.menuItems = this.themeService.currentConfig.menuItems;

    // this.themeService.addMenuItem.subscribe(items => {
    //   console.log(items);
    //   console.log(this.theme.menuItems);
    //   this.theme.menuItems = this.theme.menuItems.concat(items);
    // });
  }
}
