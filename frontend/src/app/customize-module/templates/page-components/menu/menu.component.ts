import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  theme = {isVisibleMenu: false, menuItems: []};
  currentConfig;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.themeService.currentConfig.filter((data: any) => data).subscribe(data => this.currentConfig = data);
    this.theme.isVisibleMenu = this.currentConfig.isVisibleMenu;
    this.themeService.visibleMenu.subscribe(evt => {
      this.theme.isVisibleMenu = evt;
    }, (error: string) => {
      console.error(error);
    });

    this.theme.menuItems = this.currentConfig.menuItems;
  }
}
