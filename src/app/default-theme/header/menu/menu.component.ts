import {Component, OnInit} from '@angular/core';
import {AppThemeService} from '../../../app-theme.service';
import {appConfig} from '../../../appConfig';

@Component({
  selector: 'app-default-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isHiddenMenu = false;
  altMenu = false;
  listMenu = appConfig.menu.items;

  constructor(private appThemeService: AppThemeService) {
  }

  ngOnInit() {
    this.appThemeService.visibleMenu.subscribe(evt => {
      this.isHiddenMenu = evt;
    });
    this.appThemeService.altMenu.subscribe(evt => {
      this.altMenu = evt;
    });
    this.appThemeService.addMenuItem.subscribe(item => {
      this.listMenu.push(item);
    });
  }
}
