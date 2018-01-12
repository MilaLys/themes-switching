import {Component, Input, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css']
})
export class CustomPageComponent implements OnInit {
  page = {};
  link = '';

  constructor(private themeService: ThemeService, private sanitizer: DomSanitizer) {
    this.page = this.getInnerHtmlValue(this.page);
  }

  ngOnInit() {
    this.themeService.onClick.subscribe(evt => {
      this.link = evt;
      this.page = this.themeService.currentConfig.pages[this.link].content;
    }, (error: string) => {
      console.error(error);
    });
  }

  getInnerHtmlValue(page) {
    return this.sanitizer.bypassSecurityTrustHtml(page);
  }
}
