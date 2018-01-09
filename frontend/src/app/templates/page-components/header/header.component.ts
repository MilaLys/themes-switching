import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() headerConfig: any;
  theme = {isVisibleLogo: false, logoName: '', content: {}};
  page = '/app-home';

  constructor(private themeService: ThemeService, private sanitizer: DomSanitizer) {
    this.theme.content[this.page] = this.getInnerHtmlValue();
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

  getInnerHtmlValue() {
    return this.sanitizer.bypassSecurityTrustHtml(this.theme.content[this.page]);
  }

  ngOnChanges() {
    this.theme = this.themeService.getMergedConfig();
  }
}
