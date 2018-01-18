import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'basic-template',
  templateUrl: './basic-template.component.html',
  styleUrls: ['./basic-template.component.css']
})
export class BasicTemplateComponent implements OnInit {
  @Input() data: any;

  constructor() {
  }

  ngOnInit() {
  }

}
