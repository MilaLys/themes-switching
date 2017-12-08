import {Component, OnInit} from '@angular/core';
import {appConfig} from '../../appConfig';

@Component({
  selector: 'app-default-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class DefaultHeaderComponent implements OnInit {
  logoName = appConfig.logoName;

  constructor() {
  }

  ngOnInit() {
  }
}
