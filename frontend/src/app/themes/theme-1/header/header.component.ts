import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ThemeService} from '../../../services/theme.service';
import {Theme} from '../../../../../../backend/src/theme/theme.interface';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() headerConfig: any;
  theme = {
    // name: 'Default Theme',
    // isVisibleLogo: true,
    // isVisibleMenu: false
  };

  isVisibleLogo: boolean;
  // visibleLogo$: Observable<any>;
  // changeTheme$: Observable<Theme>;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.themeService.visibleLogo.subscribe(evt => {
      this.isVisibleLogo = evt;
    }, (error: string) => {
      console.log(error);
    });

    this.themeService.changeTheme.subscribe(theme => {
      this.theme = theme;
    }, (error: string) => {
      console.log(error);
    });
  }

  ngOnDestroy() {

  }
}
