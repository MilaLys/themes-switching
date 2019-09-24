import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
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
  userId;
  currentThemeId;
  themeName;

  @ViewChild('htmlEditor') htmlEditor;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.getCurrentTheme();
    this.themeService.currentUser.subscribe(data => {
      if (!data) {
        return;
      }
      this.user = data._id;
    });
  }

  getAllFilesOfTheme(userId) {
    this.themeService.getAllFiles(userId).subscribe(data => {
      this.allFilesOfTheme = data;
    });
  }

  getCurrentTheme() {
    this.themeService.currentTheme.subscribe(data => {
      if (!data) {
        return;
      }
      this.currentThemeId = data.themeId;
      this.themeService.currentConfig.subscribe(data => this.userId = data.userId);
      this.getAllFilesOfTheme(this.userId);
      this.themeService.themes.subscribe(data => {
        this.themes = data;
        if (!data) {
          return;
        }
        this.currentTheme = this.themes.filter((o) => o.id === this.currentThemeId);
        this.themeName = this.currentTheme[0].themeName;
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
    if (newFileName === '') {
      return;
    }
    this.themeService.renameFile(userId, currentFile, newFileName);
    this.currentFile = this.newFileName;
    this.getAllFilesOfTheme(this.userId);
  }

  getChosenFileVersion(date) {
    this.chosenFile = this.fileVersions.filter((o) => o.startDate === date);
    this.htmlContent = htmlBeautify(this.chosenFile[0].value);
  }

  saveFile() {
    this.themeService.updateUserFiles(this.user, this.currentFile, this.htmlContent);
  }
}

