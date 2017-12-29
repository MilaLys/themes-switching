import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() headerConfig: any;
  theme = {};
  isVisibleLogo: boolean;
  newLogoName: string;

  constructor(public themeService: ThemeService) {
  }

  ngOnInit() {
    this.themeService.visibleLogo.subscribe(evt => {
      this.isVisibleLogo = evt;
    }, (error: string) => {
      console.log(error);
    });

    this.themeService.changeLogoName.subscribe(evt => {
      console.log(this.newLogoName = evt);
    }, (error: string) => {
      console.log(error);
    });
  }

  ngOnChanges() {
    this.theme = this.themeService.oneTheme;
  }
}
