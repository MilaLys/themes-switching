import {Component, Injectable, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';

@Injectable()
@Component({
  selector: 'app-hello-word',
  templateUrl: './default-theme.component.html',
  styleUrls: ['./default-theme.component.css']
})
export class DefaultThemeComponent implements OnInit {
  isHiddenMenu = false;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.themeService.visibleMenu.subscribe(evt => {
      this.isHiddenMenu = evt;
    });
  }
}
