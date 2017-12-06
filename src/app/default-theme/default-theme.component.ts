import {Component, Injectable, Input, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';

@Injectable()
@Component({
  selector: 'app-hello-word',
  templateUrl: './default-theme.component.html',
  styleUrls: ['./default-theme.component.css']
})
export class DefaultThemeComponent implements OnInit {
  @Input() menuVisible;

  constructor() {
  }

  ngOnInit() {

  }
}
