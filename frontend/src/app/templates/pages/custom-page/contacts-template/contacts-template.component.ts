import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'contacts-template',
  templateUrl: './contacts-template.component.html',
  styleUrls: ['./contacts-template.component.css']
})
export class ContactsTemplateComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
