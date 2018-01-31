import { AfterViewInit, Component, ViewChild } from '@angular/core';

declare let ace: any;

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements AfterViewInit{
  jsContent = "function getSumma (a,b){return a+b;}";
  htmlContent = "<div><h1>Hello!</h1></div>"
  options:any = {maxLines: 1000, printMargin: false};

  @ViewChild('editor') editor;
  @ViewChild('htmlEditor') htmlEditor;

  onRuleChange(e) {
   // console.log(e);
  }

  ngAfterViewInit() {
    // const Range = ace.require('ace/range').Range;
    //
    // this.htmlEditor.getEditor().session.addMarker(
    //   new Range(0, 0, 2, 1), "myMarker", "fullLine"
    // );
    //
    // this.editor.getEditor().session.setOption("useWorker", true);
  }
}
