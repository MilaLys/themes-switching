import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  userConfig;
  combinedObs;
  sub;
  page;
  pageContent;
  pageTemplate;
  pageData;
  trustedTemplate;
  userId = '';
  files;

  constructor(
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    const currentPage = this.route.url.map(segments => segments.pop());
    const currentUser = this.themeService.getCurrentUser();
    // const userFiles = this.themeService.getAllFilesOfTheme();

    currentUser
      .switchMap(data => this.userConfig = this.themeService.getUserConfig(data._id))
      .subscribe(() => {
        this.combinedObs = combineLatest(currentPage, currentUser, this.userConfig);
        this.sub = this.combinedObs.subscribe(info => {
          this.page = info[0]['path'];
          this.userId = info[2]['userId'];
          // this.files = info[3][0].files; // todo: display data from files
          // this.pageData = this.files.filter((o) => o.key === 'home.component.html');
          // this.pageTemplate = this.pageData[0].value;
          // this.pageContent = info[2]['pages'][this.page];
          // this.trustedTemplate = this.getInnerHtmlValue(this.pageTemplate.replace('pageContent.title', this.pageContent.title)
          //   .replace('pageContent.content', this.pageContent.content));
        });
      });
  }

  getInnerHtmlValue(pageTemplate) {
    return this.sanitizer.bypassSecurityTrustHtml(pageTemplate);
  }
}
