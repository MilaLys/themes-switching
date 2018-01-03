import {Component, OnInit} from '@angular/core';
import {appConfig} from '../../appConfig';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  theme = {isVisibleMenu: false, menuItems: []};
  // altMenu = false;
  listMenu = appConfig.menu.items;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.theme.isVisibleMenu = this.themeService.currentConfig.isVisibleMenu;
    this.themeService.visibleMenu.subscribe(evt => {
      this.theme.isVisibleMenu = evt;
    }, (error: string) => {
      console.error(error);
    });

    // this.themeService.altMenu.subscribe(evt => {
    //   this.altMenu = evt;
    // });

    this.themeService.addMenuItem.subscribe(item => {
      // this.theme.menuItems.push(item);
       this.theme.menuItems = item;
    });
  }
}
