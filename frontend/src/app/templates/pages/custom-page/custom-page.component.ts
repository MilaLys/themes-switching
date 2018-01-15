import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/operators/combineLatest';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css']
})
export class CustomPageComponent implements OnInit, OnDestroy {
  page = {};
  link;
  sub;
  user;

  constructor(private themeService: ThemeService, private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.page = this.getInnerHtmlValue(this.page);
  }

  ngOnInit() {
    const obs1 = this.route.params;
    const obs2 = this.themeService.getCurrentUser();
    const obs3 = this.themeService.getUserConfig('5a4b497181e0afe2089779b4'); // TODO: fix getting id
    obs2.subscribe(data => {
      this.user = data;
      // this.themeService.getUserConfig(this.user._id);
    });
    const combinedObs = combineLatest(obs1, obs2, obs3);

    this.sub = combinedObs.subscribe(data => {
      this.link = data[0]['link'];
      if (!this.themeService.currentConfig) {
        return;
      }
      this.page = this.themeService.currentConfig.pages[this.link].content;
    });
  }

  ngOnDestroy() {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }

  getInnerHtmlValue(page) {
    return this.sanitizer.bypassSecurityTrustHtml(page);
  }
}
