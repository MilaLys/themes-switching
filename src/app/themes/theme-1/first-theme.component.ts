import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-first-theme',
  templateUrl: './first-theme.component.html',
  styleUrls: ['./first-theme.component.css']
})
export class FirstThemeComponent implements OnInit {
  @Input() menuVisibility: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
