import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  theme = {isVisibleMenu: false, menuItems: []};

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {

    this.theme.isVisibleMenu = this.themeService.currentConfig.isVisibleMenu;

    this.themeService.visibleMenu.subscribe(evt => {
      this.theme.isVisibleMenu = evt;
    }, (error: string) => {
      console.error(error);
    });

    this.theme.menuItems = this.themeService.currentConfig.menuItems;
  }
}
