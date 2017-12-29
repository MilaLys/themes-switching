import {Component, OnInit} from '@angular/core';
import {appConfig} from '../../appConfig';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isHiddenMenu = false;
  // altMenu = false;
  listMenu = appConfig.menu.items;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.themeService.visibleMenu.subscribe(evt => {
      this.isHiddenMenu = evt;
    });

    // this.themeService.altMenu.subscribe(evt => {
    //   this.altMenu = evt;
    // });

    this.themeService.addMenuItem.subscribe(item => {
      this.listMenu.push(item);
    });
  }
}
