import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page = {};

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.page = this.themeService.currentConfig;
    // console.log(this.page);
  }

}
