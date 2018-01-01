import { EventEmitter, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ThemeService {
  visibleMenu: EventEmitter<boolean> = new EventEmitter();
  visibleLogo: EventEmitter<boolean> = new EventEmitter();
  altMenu: EventEmitter<boolean> = new EventEmitter();
  addMenuItem: EventEmitter<string> = new EventEmitter();
  changeLogoName: EventEmitter<string> = new EventEmitter<string>();

  themes = [];
  // oneTheme: object = {}; // TODO: change to currentTheme
  currentUser = {_id: null, name: null, email: null, password: null};
  currentTheme = {_id: null, themeId: null, userId: null};
  currentConfig = {_id: null, userId: null, isVisibleMenu: null, isVisibleLogo: null, logoName: null};

  private apiUrl = 'http://localhost:3000/api';

  constructor(private httpService: HttpService) {
  }

  getThemes(): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/themes`)
      .map((data: Response) => {
        this.themes = data.json();
        return this.themes;
      });
  }

  // getOneTheme(id): Observable<any> {
  //   return this.httpService
  //     .get(`${this.apiUrl}/themes/${id}`)
  //     .map((data: Response) => {
  //       this.oneTheme = data.json();
  //       return this.oneTheme;
  //     });
  // }

  updateUserConfig(): Observable<any> {
    return this.httpService
      .put(`${this.apiUrl}/user-config/${this.currentUser._id}`, this.currentConfig)
      .map((data: Response) => data.json());
  }

  updateUserTheme(): Observable<any> {
    console.log(124);
    return this.httpService
      .put(`${this.apiUrl}/user-theme/${this.currentUser._id}`, this.currentTheme);
  }

  getCurrentUser(): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/user`)
      .map((data: Response) => {
        this.currentUser = data.json();
        return this.currentUser;
      })
  }

  getUserTheme(id): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/user-theme/${id}`)
      .map((data: Response) => {
        this.currentTheme = data.json();
        return this.currentTheme;
      })
  }

  getUserConfig(id): Observable<any> {
    return this.httpService
      .get(`${this.apiUrl}/user-config/${id}`)
      .map((data: Response) => {
        this.currentConfig = data.json();
        return this.currentConfig;
      })
  }

  public getMergedConfig() {
    let theme;
    for (let i = 0; i < this.themes.length; i++) {
      if (this.themes[i].id == this.currentTheme.themeId) {
        theme = this.themes[i];
        break;
      }
    }
    return Object.assign({}, theme, this.currentConfig);
  }
}

