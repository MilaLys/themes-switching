import {EventEmitter, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ThemeService {
  visibleMenu: EventEmitter<boolean> = new EventEmitter();
  visibleLogo: EventEmitter<boolean> = new EventEmitter();
  altMenu: EventEmitter<boolean> = new EventEmitter();
  addMenuItem: EventEmitter<string> = new EventEmitter();
  changeLogoName: EventEmitter<string> = new EventEmitter();

  theme = {};
  oneTheme = {};
  private apiUrl = 'http://localhost:3000/api/themes';

  constructor(private httpService: HttpService, private http: Http) {
  }

  getTheme(): Observable<any> {
    return this.httpService.get(`${this.apiUrl}`).map((data: any) => {
      this.theme = data.json();
      return this.theme;
    });
  }

  getOneTheme(id): Observable<any> {
    return this.httpService.get(`${this.apiUrl}/${id}`).map((data: any) => {
      this.oneTheme = data.json();
      return this.oneTheme;
    });
  }

  updateThemeConfig(id, themeConfig): Observable<any> {
    return this.httpService.put(`${this.apiUrl}/${id}`, themeConfig).map((data: any) => data.json());
  }
}
