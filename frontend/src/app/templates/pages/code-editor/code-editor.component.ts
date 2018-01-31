import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  code;

  constructor() {
    this.code = `function(a, b){return a + b;}`;
  }

  ngOnInit() {
  }
}
