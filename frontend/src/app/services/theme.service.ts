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
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import { ThemeFile } from '../customize-module/models/theme-file.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ThemeService {
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  lastEditedFile: Subject<ThemeFile>;
  currentConfig: BehaviorSubject<CurrentConfig> = new BehaviorSubject<CurrentConfig>(null);
  currentTheme: BehaviorSubject<CurrentTheme> = new BehaviorSubject<CurrentTheme>(null);
  themes: BehaviorSubject<CurrentTheme[]> = new BehaviorSubject<CurrentTheme[]>(null);

  visibleMenu: EventEmitter<boolean> = new EventEmitter();
  visibleLogo: EventEmitter<boolean> = new EventEmitter();
  addMenuItem: EventEmitter<string> = new EventEmitter();
  changeLogoName: EventEmitter<string> = new EventEmitter<string>();
  changePage: EventEmitter<string> = new EventEmitter<string>();

  page: Page;
  files: ThemeFile[] = [];
  fileVersions: ThemeFile[] = [];

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) {
    this.lastEditedFile = new Subject<ThemeFile>();
  }

  public getThemes(): Observable<Theme[]> {
    return this.httpService
      .get(`${this.apiUrl}/themes`)
      .map((data: Response) => data.json())
      .do((dataJson) => {
        this.themes.next(dataJson);
      })
  }

  public updateUserConfig(id: string, config: object): void {
    this.httpService
      .put(`${this.apiUrl}/user-config/${id}`, config)
      .subscribe(data => data.json());
  }

  public updateUserFiles(id: string, key: string, value: string): void {
    this.httpService
      .post(`${this.apiUrl}/user-files/${id}`, {key: key, value: value})
      .subscribe(data => data.json());
  }

  public getAllFiles(userId: string): Observable<ThemeFile[]> {
    return this.httpService
      .get(`${this.apiUrl}/user-files/${userId}`)
      .map((data: Response) => {
        this.files = data.json();
        return this.files;
      });
  }

  public getLastUserFile(userId: string): Observable<ThemeFile> {
    return this.httpService
      .get(`${this.apiUrl}/user-files/${userId}`)
      .map((data: Response) => data.json())
      .do((dataJson) => {
        this.lastEditedFile.next(dataJson);
      });
  }

  public getFileVersions(userId: string, key: string): Observable<ThemeFile[]> {
    return this.httpService
      .get(`${this.apiUrl}/user-files/versions/${userId}/${key}`)
      .map((data: Response) => {
        this.fileVersions = data.json();
        return this.fileVersions;
      });
  }

  public deleteFileVersion(userId: string, currentFile: string): Observable<Response> {
    return this.httpService
      .delete(`${this.apiUrl}/user-files/${userId}`, {body: {key: currentFile}});
  }

  public renameFile(userId: string, currentFile: string, newFileName: string): void {
    this.httpService
      .put(`${this.apiUrl}/user-files/${userId}`, {currentFile: currentFile, newFileName: newFileName})
      .subscribe(data => data.json());
  }

  public updateUserTheme(userId: string, themeId: number): void {
    this.httpService
      .put(`${this.apiUrl}/user-theme/${userId}`, {themeId: themeId})
      .subscribe(data => data);
  }

  public getCurrentUser(): Observable<User> {
    return this.httpService
      .get(`${this.apiUrl}/user`)
      .map((data: Response) => data.json())
      .do((dataJson) => {
        this.currentUser.next(dataJson);
      });
  }

  public getUserTheme(id: string): Observable<CurrentTheme> {
    return this.httpService
      .get(`${this.apiUrl}/user-theme/${id}`)
      .map((data: Response) => data.json())
      .do((dataJson) => {
        this.currentTheme.next(dataJson);
      })
  }

  public getUserConfig(id): Observable<CurrentConfig> {
    // return this.httpService
    //   .get(`${this.apiUrl}/user-config/${id}`)
    //   .map((data: Response) => {
    //   this.currentConfig = data.json();
    //   if (this.currentConfig.pages == null) {
    //     this.currentConfig.pages = {};
    //   }
    //   if (this.currentConfig.menuItems == null) {
    //     this.currentConfig.menuItems = [];
    //   }
    //   return this.currentConfig;
    // });

    return this.httpService
      .get(`${this.apiUrl}/user-config/${id}`)
      .map((data: Response) => data.json())
      .do((dataJson) => {
        this.currentConfig.next(dataJson);
      });
  }

  public getMergedConfig() {
    let theme;
    let mergedTheme;
    let themeId;
    let themes;

    this.themes.asObservable().subscribe(data => themes = data);
    this.currentTheme.asObservable().subscribe(data => {
      themeId = data.themeId;
    });

    for (let i = 0; i < themes.length; i++) {
      if (themes[i].id === themeId) {
        theme = themes[i];
        break;
      }
    }

    this.currentConfig.asObservable().subscribe(data => mergedTheme = data);

    return Object.assign({}, theme, mergedTheme);
  }
}

