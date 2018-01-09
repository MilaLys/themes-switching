import { EventEmitter, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../models/user.interface';
import { CurrentTheme } from '../models/current-theme.interface';
import { CurrentConfig } from '../models/current-config';

@Injectable()
export class ThemeService {
  visibleMenu: EventEmitter<boolean> = new EventEmitter();
  visibleLogo: EventEmitter<boolean> = new EventEmitter();
  addMenuItem: EventEmitter<string> = new EventEmitter();
  changeLogoName: EventEmitter<string> = new EventEmitter<string>();
  changePage: EventEmitter<string> = new EventEmitter<string>();

  themes = [];
  currentUser: User;
  currentTheme: CurrentTheme;
  currentConfig: CurrentConfig;

  private apiUrl = 'http://localhost:3000/api';

  constructor(private httpService: HttpService) {
  }

  public getThemes(): Observable<any> {
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

  public updateUserTheme(userId, themeId): void {
    this.httpService
      .put(`${this.apiUrl}/user-theme/${userId}`, {themeId: themeId})
      .subscribe(data => data.json());
  }

  public getCurrentUser(): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/user`)
      .map((data: Response) => {
        this.currentUser = data.json();
        return this.currentUser;
      });
  }

  public getUserTheme(id): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/user-theme/${id}`)
      .map((data: Response) => {
        this.currentTheme = data.json();
        return this.currentTheme;
      });
  }

  public getUserConfig(id): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/user-config/${id}`)
      .map((data: Response) => {
        this.currentConfig = data.json();
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

