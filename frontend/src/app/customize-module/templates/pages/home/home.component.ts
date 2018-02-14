import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {ActivatedRoute} from '@angular/router';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  combinedObs;
  sub;
  page;
  pageContent;
  pageTemplate;
  pageData;
  trustedTemplate;
  userId = '';
  files;
  lastUserFile;
  content;
  pagePath = '';

  constructor(private themeService: ThemeService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    const currentPage = this.route.url.map(segments => segments.pop());
    const currentUser = this.themeService.getCurrentUser();

    currentUser
      .switchMap(data =>
        this.lastUserFile = this.themeService.getLastUserFile(data._id)
      )
      .subscribe(() => {
        this.combinedObs = combineLatest(currentPage, currentUser, this.lastUserFile);
        this.sub = this.combinedObs.subscribe(info => {
          this.pagePath = info[0].path;
          this.userId = info[1]['_id'];
          this.files = info[2];
          this.pageData = this.files.filter((o) => o.key === 'home.component.html');
          this.pageTemplate = this.pageData[0].value;

          // get content from currentConfig
          this.themeService.getUserConfig(this.userId).subscribe(config => {
            this.pageContent = config['pages'][this.pagePath];
            this.trustedTemplate = this.getInnerHtmlValue(this.pageTemplate.replace('pageContent.title', this.pageContent.title)
              .replace('pageContent.content', this.pageContent.content));
          });
        });
      });
  }

  getInnerHtmlValue(pageTemplate) {
    return this.sanitizer.bypassSecurityTrustHtml(pageTemplate);
  }
}
