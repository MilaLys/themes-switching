import {Component, Input, ReflectiveInjector, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {BasicTemplateComponent} from './basic-template/basic-template.component';
import {ContactsTemplateComponent} from './contacts-template/contacts-template.component';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'custom-content',
  entryComponents: [BasicTemplateComponent, ContactsTemplateComponent],
  template: `
    <div #dynamicComponentContainer dynamicComponentsContainer></div>
  `,
  styleUrls: ['./custom-page.component.css']
})
export class CustomContentComponent {
  template = 'BasicTemplateComponent';
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

  constructor(private resolver: ComponentFactoryResolver, private themeService: ThemeService) {
  }

  ngOnInit() {
    this.themeService.applyTemplate.subscribe(data => {
      this.template = data;
      console.log(this.template);
    }, (error: string) => {
      console.error(error);
    });
    this.applyTemplate(this.template);
  }

  applyTemplate(template) {
    this.componentData = {
      component: template,
      inputs: {
      }
    };
  }
}

