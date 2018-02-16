import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import * as htmlBeautify from 'html-beautify';

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  htmlContent = '';
  options: any = {maxLines: 'Infinity'};
  currentTheme;
  themes;
  user;
  theme;
  files;
  isFileChosen = false;
  currentFile = '';
  startDate = 'Older versions';
  allFilesOfTheme;
  fileVersions;
  chosenFile;
  html;
  newFileName = '';

  @ViewChild('htmlEditor') htmlEditor;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.getThemes();
    this.getCurrentTheme();
  }

  getAllFilesOfTheme(userId) {
    this.themeService.getAllFiles(userId).subscribe(data => {
      this.allFilesOfTheme = data;
    });
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
      this.fileVersions = data;
    });
  }

  deleteFileVersion(userID, currentFile) {
    if (confirm(`Do you really want to remove page ${this.currentFile}`)) {
      this.themeService
        .deleteFileVersion(userID, currentFile)
        .subscribe(
          result => console.log(result),
          error => console.error(error)
        );
    }
    this.htmlContent = '';
    this.currentFile = '';
    this.isFileChosen = false;
    this.allFilesOfTheme = this.getAllFilesOfTheme(this.user);
    this.fileVersions = [];
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

  renameFile(userId, currentFile, newFileName) {
    console.log(userId, currentFile, newFileName);
    this.themeService.renameFile(userId, currentFile, newFileName);
  }

  getChosenFileVersion(date) {
    this.chosenFile = this.fileVersions.filter((o) => o.startDate === date);
    this.htmlContent = htmlBeautify(this.chosenFile[0].value);
  }

  saveFile() {
    this.themeService.updateUserFiles(this.user, this.currentFile, this.htmlContent);
  }
}

