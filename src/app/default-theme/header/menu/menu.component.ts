import {Component, OnInit} from '@angular/core';
import {AppThemeService} from '../../../app-theme.service';

@Component({
  selector: 'app-default-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isHiddenMenu = false;
  otherMenu = false;
  defaultMenu = true;
  listMenu = ['Home', 'About', 'Contacts'];

  constructor(private appThemeService: AppThemeService) {
  }

  ngOnInit() {
    this.appThemeService.visibleMenu.subscribe(evt => {
      this.isHiddenMenu = evt;
    });
    this.appThemeService.otherMenu.subscribe(evt => {
      this.otherMenu = evt;
    });
    this.appThemeService.addMenuItem.subscribe(item => {
      this.listMenu.push(item);
    });
  }
}
