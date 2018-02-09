import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
// import * as ace from 'brace';
// import 'brace/mode/javascript';
// import 'brace/theme/monokai';
import htmlBeautify from 'html-beautify';

declare let ace: any;

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements AfterViewInit, OnInit {
  htmlContent: any;
  options: any = {maxLines: 'Infinity'};
  themes;
  user;
  theme;
  currentTheme;
  files;

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
      this.themeService.getUserConfig(this.user).subscribe(config => {
        this.files = config.files;
      });
    });
  }

  getCode() {
    this.htmlContent = htmlBeautify(this.files[0].value);
  }

  onRuleChange(e) {
    // console.log(e);
  }

  ngAfterViewInit() {
    // const editor = ace.edit('javascript-editor');
    // editor.getSession().setMode('ace/mode/javascript');
    // editor.setTheme('ace/theme/monokai');

    // const beautify = ace.require('ace/ext/beautify');
    // const editor = ace.edit('htmlEditor');
    // beautify.beautify(editor.session);
    // const Range = ace.require('ace/range').Range;
    //
    // this.htmlEditor.getEditor().session.addMarker(
    //   new Range(0, 0, 2, 1), 'myMarker', 'fullLine'
    // );

     // this.htmlEditor.getEditor().session.setOption('useWorker', true);
  }
}
