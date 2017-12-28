import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {appConfig} from '../../appConfig';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class DefaultHeaderComponent implements OnInit {
  @Input() headerConfig: any;
  logoName = appConfig.logoName;
  theme: object;

  constructor(public themeService: ThemeService) {
  }

  ngOnInit() {
    // this.themeService.currentTheme.subscribe(evt => {
    //   this.theme = evt;
    // }, (error: string) => {
    //   console.log(error);
    // });
    // console.log(this.theme);
  }
}
