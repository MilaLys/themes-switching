import {Component, OnInit, Input} from '@angular/core';
import {ThemeService} from '../../../../services/theme.service';
import {appConfig} from '../../../../appConfig';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() menuConfig: any;
  // @Input() isVisibleMenu = this.menuConfig.isVisibleMenu;

  altMenu = false;
  listMenu = appConfig.menu.items;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    /*this.themeService.visibleMenu.subscribe(evt => {
      this.isVisibleMenu = evt;
    });*/

    this.themeService.altMenu.subscribe(evt => {
      this.altMenu = evt;
    });

    this.themeService.addMenuItem.subscribe(item => {
      this.listMenu.push(item);
    });
  }
}
