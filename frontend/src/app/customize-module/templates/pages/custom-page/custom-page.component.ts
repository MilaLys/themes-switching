import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/operators/combineLatest';
import 'rxjs/operators/switchMap';
import 'rxjs/add/operator/switchMap';
import { ContactsTemplateComponent } from './contacts-template/contacts-template.component';
import { BasicTemplateComponent } from './basic-template/basic-template.component';

@Component({
  selector: 'custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css'],
  entryComponents: [BasicTemplateComponent, ContactsTemplateComponent]
})
export class CustomPageComponent implements OnInit {
  componentData;
  page;
  link;
  user;

  constructor(private themeService: ThemeService,
              private sanitizer: DomSanitizer) {
    // this.page = this.getInnerHtmlValue(this.page);
  }

  ngOnInit() {
  }

  getInnerHtmlValue(page) {
    return this.sanitizer.bypassSecurityTrustHtml(page);
  }
}

