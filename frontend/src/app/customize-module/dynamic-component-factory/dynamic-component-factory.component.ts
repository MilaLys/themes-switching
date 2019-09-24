import {
  Component,
  ViewChild,
  ViewContainerRef,
  Input,
  ComponentFactoryResolver
} from '@angular/core';
import { THEMES } from '../../theme-module/themes';
import { ComponentLoader, inputData } from '../component-loader.decorator';


@Component({
  selector: 'router-outlet',
  entryComponents: [THEMES],
  template: `
    <div #dynamicComponentContainer></div>
  `,
  styleUrls: ['./dynamic-component-factory.component.css']
})

export class DynamicComponentFactory {
  currentComponent = null;
  @ViewChild('dynamicComponentContainer', {read: ViewContainerRef}) dynamicComponentContainer: ViewContainerRef;

  @ComponentLoader()
  @Input() set componentData(@inputData data: { component: any, inputs: any }) {
  }

  constructor(private resolver: ComponentFactoryResolver) {
  }
}
