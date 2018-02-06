import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';

declare let ace: any;

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements AfterViewInit, OnInit {
  jsContent = 'function getSumma (a,b){return a+b;}';
  htmlContent = '<div><h1>Hello!</h1></div>';
  options: any = {maxLines: 1000, printMargin: false};
  themes;
  user;
  theme;
  currentTheme;

  @ViewChild('editor') editor;
  @ViewChild('htmlEditor') htmlEditor;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.getThemes();
    this.getCurrentTheme();
  }

  getThemes() {
    this.themeService.getThemes().subscribe(data => {
      this.themes = data;
    });
  }

  getCurrentTheme() {
    this.themeService.getCurrentUser().subscribe(data => {
      this.user = data._id;
      this.themeService.getUserTheme(this.user).subscribe(info => {
        this.theme = info;
        this.currentTheme = this.themes.filter((obj) => obj['id'] === this.theme.themeId)[0];
      });
    });
  }

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
