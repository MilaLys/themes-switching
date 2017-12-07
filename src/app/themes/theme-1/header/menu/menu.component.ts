import {Component, OnInit} from '@angular/core';
import {AppThemeService} from '../../../../app-theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isHiddenMenu = false;

  constructor(private appThemeService: AppThemeService) {
  }

  ngOnInit() {
    this.appThemeService.visibleMenu.subscribe(evt => {
      this.isHiddenMenu = evt;
    });
  }
}
