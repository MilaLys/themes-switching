import { EventEmitter, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../customize-module/models/user.interface';
import { CurrentTheme } from '../customize-module/models/current-theme.interface';
import { CurrentConfig } from '../customize-module/models/current-config';
import { Theme } from '../customize-module/models/theme.interface';
import { Page } from '../customize-module/models/page.interface';
import { environment } from '../../environments/environment';

@Injectable()
export class ThemeService {
  visibleMenu: EventEmitter<boolean> = new EventEmitter();
  visibleLogo: EventEmitter<boolean> = new EventEmitter();
  addMenuItem: EventEmitter<string> = new EventEmitter();
  changeLogoName: EventEmitter<string> = new EventEmitter<string>();
  changePage: EventEmitter<string> = new EventEmitter<string>();
  applyTemplate: EventEmitter<string> = new EventEmitter<string>();

  themes = [];
  currentUser: User;
  currentTheme: CurrentTheme;
  currentConfig: CurrentConfig;
  page: Page;
  files;
  lastEditedFile;
  fileVersions;

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) {
  }

  public getThemes(): Observable<Theme[]> {
    return this.httpService
      .get(`${this.apiUrl}/themes`)
      .map((data: Response) => {
        this.themes = data.json();
        return this.themes;
      });
  }

  public updateUserConfig(id, config): void {
    this.httpService
      .put(`${this.apiUrl}/user-config/${id}`, config)
      .subscribe(data => data.json());
  }

  public updateUserFiles(id, key, value): void {
    this.httpService
      .post(`${this.apiUrl}/user-files/${id}`, {key: key, value: value})
      .subscribe(data => data.json());
  }

  public getAllFiles(userId): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/user-files/${userId}`)
      .map((data: Response) => {
        this.files = data.json().configs;
        return this.files;
      });
  }

  public getLastUserFile(userId): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/user-files/${userId}`)
      .map((data: Response) => {
        this.lastEditedFile = data.json().configs;
        return this.lastEditedFile;
      });
  }

  public getFileVersions(userId, key): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/user-files/versions/${userId}/${key}`)
      .map((data: Response) => {
        this.fileVersions = data.json();
        return this.fileVersions;
      });
  }

  public deleteFileVersion(userID, currentFile): Observable<Response> {
    return this.httpService
      .delete(`${this.apiUrl}/user-files/${userID}`, {body: {key: currentFile}});
  }

  public renameFile(userId, currentFile, newFileName): void {
    this.httpService
      .put(`${this.apiUrl}/user-files/${userId}`, {currentFile: currentFile, newFileName: newFileName})
      .subscribe(data => data.json());
  }

  public updateUserTheme(userId, themeId): void {
    this.httpService
      .put(`${this.apiUrl}/user-theme/${userId}`, {themeId: themeId})
      .subscribe(data => data.json());
  }

  public getCurrentUser(): Observable<User> {
    return this.httpService
      .get(`${this.apiUrl}/user`)
      .map((data: Response) => {
        this.currentUser = data.json();
        return this.currentUser;
      });
  }

  public getUserTheme(id): Observable<CurrentTheme> {
    return this.httpService
      .get(`${this.apiUrl}/user-theme/${id}`)
      .map((data: Response) => {
        this.currentTheme = data.json();
        return this.currentTheme;
      });
  }

  public getUserConfig(id): Observable<CurrentConfig> {
    return this.httpService.get(`${this.apiUrl}/user-config/${id}`).map((data: Response) => {
      this.currentConfig = data.json();
      if (this.currentConfig.pages == null) {
        this.currentConfig.pages = {};
      }
      if (this.currentConfig.menuItems == null) {
        this.currentConfig.menuItems = [];
      }
      return this.currentConfig;
    });
  }

  public getMergedConfig() {
    let theme;
    for (let i = 0; i < this.themes.length; i++) {
      if (this.themes[i].id === this.currentTheme.themeId) {
        theme = this.themes[i];
        break;
      }
    }
    return Object.assign({}, theme, this.currentConfig);
  }
}

