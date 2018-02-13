import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import htmlBeautify from 'html-beautify';
import { CurrentConfig } from '../../../models/current-config';

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  htmlContent: any;
  options: any = {maxLines: 'Infinity'};
  themes;
  user;
  theme;
  currentTheme;
  files;
  isFileChosen: boolean = false;
  currentFile = '';
  versionsOfFile;
  startDate;
  allFilesOfTheme;
  fileVersions;

  @ViewChild('htmlEditor') htmlEditor;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.getThemes();
    this.getCurrentTheme();
  }

  getAllFilesOfTheme(userId){
    this.themeService.getAllFiles(userId).subscribe(data => {
      this.allFilesOfTheme = data;
    })
  }

  getThemes() {
    this.themeService.getThemes().subscribe(data => {
      this.themes = data;
    });
  }

  getCurrentTheme() {
    this.themeService.getCurrentUser().subscribe(data => {
      this.user = data._id;
      this.getAllFilesOfTheme(this.user);

      this.themeService.getUserTheme(this.user).subscribe(info => {
        this.theme = info;
        this.currentTheme = this.themes.filter((obj) => obj['id'] === this.theme.themeId)[0];
      });
    });
  }

  getFileVersions(userId, key) {
    this.themeService.getFileVersions(userId, key).subscribe(data => {
      this.fileVersions = data; // this.formatDate(this.startDate);
    })
  }

  formatDate(date) {
    let dateNow = new Date();
    let dateNowMs = dateNow.getTime();
    let diff = dateNowMs - date.getTime();

    if (diff < 1000) {
      return 'right now';
    }

    let sec = Math.floor(diff / 1000);

    if (sec < 60) {
      return sec + ' seconds ago';
    }

    let min = Math.floor(diff / 60000);
    if (min < 60) {
      return min + ' minutes ago';
    }

    let d = date;
    d = [
      '0' + d.getDate(),
      '0' + (d.getMonth() + 1),
      '' + d.getFullYear(),
      '0' + d.getHours(),
      '0' + d.getMinutes()
    ];

    for (let i = 0; i < d.length; i++) {
      d[i] = d[i].slice(-2);
    }

    return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
  }

  getByValue(array, key) {
    const result = array.filter((o) =>
      o.key === key
    );
    return result ? result[0] : null;
  }

  setByValue(array, key, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].key === key) {
        array[i].value = value;
        return;
      }
    }
    array.push({key: key, value: value});
  }

  getCode(currentFile) {
    const code = this.getByValue(this.allFilesOfTheme, currentFile);
    this.htmlContent = htmlBeautify(code.value);
    this.isFileChosen = true;
    this.currentFile = currentFile;
    this.getFileVersions(this.user, this.currentFile);
  }

  saveFile() {
    // this.setByValue(this.allFilesOfTheme, this.currentFile, this.htmlContent);
    console.log(this.user, this.currentFile, this.htmlContent);
    this.themeService.updateUserFiles(this.user, this.currentFile, this.htmlContent);
  }
}
