import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  page;
  pageContent;
  pageTemplate;
  pageData;
  trustedTemplate;
  userId = '';
  files;
  content;
  pagePath = '';
  user;

  constructor(private themeService: ThemeService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.route.url.map(segments => segments.pop()).subscribe(data => {
      this.pagePath = data.path;
    });

    this.themeService.currentUser.filter((data: any) => data)
      .flatMap(success => this.themeService.getLastUserFile(success._id))
      .subscribe(success => {
        this.user = success[0].userId;
        this.pageData = success;
        this.pageTemplate = this.pageData[0].value;

        // get content from currentConfig
        this.themeService.getUserConfig(this.user).subscribe(config => {
          this.pageContent = config['pages'][this.pagePath];
          this.trustedTemplate = this.getInnerHtmlValue(this.pageTemplate.replace('pageContent.title', this.pageContent.title)
            .replace('pageContent.content', this.pageContent.content));
        });
      });
  }

  getInnerHtmlValue(pageTemplate) {
    return this.sanitizer.bypassSecurityTrustHtml(pageTemplate);
  }
}
