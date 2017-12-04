import {Component, Injectable, Injector } from '@angular/core';
import {Greeter} from '../greeter';

@Injectable()
@Component({
  selector: 'app-hello-word',
  templateUrl: './default-theme.component.html', // `Complete: <ng-content></ng-content> <ng-content></ng-content>{{greeter.suffix}}`
  styleUrls: ['./default-theme.component.css']
})
export class DefaultThemeComponent {
  greeter = new Greeter();
 /* showNum = 0;
  constructor(private injector: Injector) {
    this.showNum = this.injector.get('showNum');
  }*/
}
