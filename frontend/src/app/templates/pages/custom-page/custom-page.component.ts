import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/operators/combineLatest';
import 'rxjs/operators/switchMap';
import {combineLatest} from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css']
})
export class CustomPageComponent implements OnInit, OnDestroy {
  page: object;
  link;
  sub;
  user;
  obs3;
  combinedObs;

  constructor(private themeService: ThemeService, private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.page = this.getInnerHtmlValue(this.page);
  }

  ngOnInit() {
    const obs1 = this.route.params;
    const obs2 = this.themeService.getCurrentUser();

    obs2
      .switchMap(data => this.obs3 = this.themeService.getUserConfig(data._id))
      .subscribe(() => {
        this.combinedObs = combineLatest(obs1, obs2, this.obs3);
        this.sub = this.combinedObs.subscribe(info => {
          this.link = info[0]['link'];
          if (!this.themeService.currentConfig) {
            return;
          }
          this.page = this.themeService.currentConfig.pages[this.link].content;
        });
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
