import {Type} from '@angular/core';

export class Template {
  constructor(public component: Type<any>, public data: any) {}
}
