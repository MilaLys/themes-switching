import {EventEmitter, Injectable} from '@angular/core';
import {HttpService} from './http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ThemeService {
  visibleMenu: EventEmitter<boolean> = new EventEmitter();
  altMenu: EventEmitter<boolean> = new EventEmitter();
  addMenuItem: EventEmitter<string> = new EventEmitter();

  private theme = {};
  private apiUrl = 'http://localhost:3000/api/themes';

  constructor(private httpService: HttpService) {
  }

  getTheme(): Observable<any> {
    return this.httpService.get(`${this.apiUrl}`).map((data: any) => data.json());
  }
}
