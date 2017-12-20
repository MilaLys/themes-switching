import {Component, OnInit, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() headerConfig: any;
  logoName: string;
  isVisibleLogo: boolean;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.themeService.visibleLogo.subscribe(evt => {
      this.isVisibleLogo = evt;
    });
    this.themeService.changeLogoName.subscribe(evt => {
      this.logoName = evt;
    });
  }
}
