import {Component, Injectable, OnInit} from '@angular/core';
import {AppThemeService} from '../app-theme.service';

@Injectable()
@Component({
  selector: 'app-hello-word',
  templateUrl: './default-theme.component.html',
  styleUrls: ['./default-theme.component.css']
})
export class DefaultThemeComponent implements OnInit {
  isHiddenMenu = false;

  constructor(private appThemeService: AppThemeService) {
  }

  ngOnInit() {
    this.appThemeService.visibleMenu.subscribe(evt => {
      this.isHiddenMenu = evt;
    });
  }
}
