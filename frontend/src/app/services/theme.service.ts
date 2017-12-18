import {EventEmitter, Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class ThemeService {
  visibleMenu: EventEmitter<boolean> = new EventEmitter();
  altMenu: EventEmitter<boolean> = new EventEmitter();
  addMenuItem: EventEmitter<string> = new EventEmitter();

  private theme = {};
  private apiUrl = 'http://localhost:3000/api/themes';

  constructor(private httpService: HttpService) {
  }

  public getTheme(): void {
    this.httpService.get(`${this.apiUrl}`).subscribe(data => {
      return data.json().theme;
    }, err => {
      console.log(err.body || err.statusText);
    });
  }
}
