import {
  Component,
  ReflectiveInjector,
  ViewChild,
  ViewContainerRef,
  Input,
  ComponentFactoryResolver
} from '@angular/core';

import {DefaultThemeComponent} from '../default-theme/default-theme.component';
import {THEMES} from '../themes';


@Component({
  selector: 'app-outlet-component',
  entryComponents: [DefaultThemeComponent, THEMES],
  template: `
    <div #dynamicComponentContainer></div>
  `,
  styleUrls: ['./outlet-component.component.css']
})

export class OutletComponentComponent {
  currentComponent = null;
  @ViewChild('dynamicComponentContainer', {read: ViewContainerRef}) dynamicComponentContainer: ViewContainerRef;

  // component: Class for the component you want to create
  // inputs: An object with key/value pairs mapped to input name/input value
  @Input() set componentData(data: { component: any, inputs: any }) {
    if (!data) {
      return;
    }
    const inputProviders = Object.keys(data.inputs).map((inputName) => {
      return {provide: inputName, useValue: data.inputs[inputName]};
    });
    const resolvedInputs = ReflectiveInjector.resolve(inputProviders);
    const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
    const factory = this.resolver.resolveComponentFactory(data.component);
    const component = factory.create(injector);

    this.dynamicComponentContainer.insert(component.hostView);

    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
    this.currentComponent = component;
  }

  constructor(private resolver: ComponentFactoryResolver) {
  }
}
