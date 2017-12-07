import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class AppThemeService {
  visibleMenu: EventEmitter<boolean> = new EventEmitter();
  otherMenu: EventEmitter<boolean> = new EventEmitter();
  addMenuItem: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

}
