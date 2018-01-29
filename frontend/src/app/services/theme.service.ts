import {EventEmitter, Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from '../models/user.interface';
import {CurrentTheme} from '../models/current-theme.interface';
import {CurrentConfig} from '../models/current-config';
import {Theme} from '../models/theme.interface';
import {Page} from '../models/page.interface';
import {environment} from '../../environments/environment';

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
  configs: CurrentConfig[] = [];

  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) {
  }

  public getThemes(): Observable<Theme[]> {
    return this.httpService
      .get(`${this.apiUrl}/api/themes`)
      .map((data: Response) => {
        this.themes = data.json();
        return this.themes;
      });
  }

  public updateUserConfig(id, config): void {
    this.httpService
      .post(`${this.apiUrl}/api/user-config/${id}`, config)
      .subscribe(data => data.json());
  }

  public getAllConfigs(): Observable<CurrentConfig[]> {
    return this.httpService
      .get(`${this.apiUrl}/api/user-config`)
      .map((data: Response) => {
        this.configs = data.json().configs;
        return this.configs;
      });
  }

  public updateUserTheme(userId, themeId): void {
    this.httpService
      .put(`${this.apiUrl}/api/user-theme/${userId}`, {themeId: themeId})
      .subscribe(data => data.json());
  }

  public getCurrentUser(): Observable<User> {
    return this.httpService
      .get(`${this.apiUrl}/api/user`)
      .map((data: Response) => {
        this.currentUser = data.json();
        return this.currentUser;
      });
  }

  public getUserTheme(id): Observable<CurrentTheme> {
    return this.httpService
      .get(`${this.apiUrl}/api/user-theme/${id}`)
      .map((data: Response) => {
        this.currentTheme = data.json();
        return this.currentTheme;
      });
  }

  public getUserConfig(id): Observable<CurrentConfig> {
    return this.httpService.get(`${this.apiUrl}/api/user-config/${id}`).map((data: Response) => {
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

