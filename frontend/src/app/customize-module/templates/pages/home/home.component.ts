import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {ActivatedRoute} from '@angular/router';
import {combineLatest} from 'rxjs/observable/combineLatest';

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

  constructor(private themeService: ThemeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const currentPage = this.route.url.map(segments => segments.pop());
    const currentUser = this.themeService.getCurrentUser();


    currentUser
      .switchMap(data => this.userConfig = this.themeService.getUserConfig(data._id))
      .subscribe(() => {
        this.combinedObs = combineLatest(currentPage, currentUser, this.userConfig);
        this.sub = this.combinedObs.subscribe(info => {
          this.page = info[0]['path'];
          this.pageContent = info[2]['pages'][this.page];
        });
      });
  }
}
