import { Component, Injectable, OnInit } from '@angular/core';

@Injectable()
@Component({
  selector: 'app-default-theme',
  templateUrl: './default-theme.component.html',
  styleUrls: ['./default-theme.component.css']
})

export class DefaultThemeComponent implements OnInit {
  theme;

  constructor() {
  }

  ngOnInit() {
  }
}
