import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() headerConfig: any;
  theme = {isVisibleLogo: false, logoName: '', content: {}, headerDark: ''};
  page = '/app-home';

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.themeService.visibleLogo.subscribe(evt => {
      this.theme.isVisibleLogo = evt;
    }, (error: string) => {
      console.error(error);
    });

    this.themeService.changeLogoName.subscribe(evt => {
      this.theme.logoName = evt;
    }, (error: string) => {
      console.error(error);
    });

    this.themeService.changePage.subscribe(evt => {
      this.page = evt;
    }, (error: string) => {
      console.error(error);
    });
  }

  ngOnChanges() {
    this.theme = this.themeService.getMergedConfig();
  }
}
