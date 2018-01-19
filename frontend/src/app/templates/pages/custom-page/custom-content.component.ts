import {
  Component,
  Input,
  ReflectiveInjector,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { BasicTemplateComponent } from './basic-template/basic-template.component';
import { ContactsTemplateComponent } from './contacts-template/contacts-template.component';
import { ThemeService } from '../../../services/theme.service';
import { TEMPLATES } from '../../../themes';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'custom-content',
  entryComponents: [BasicTemplateComponent, ContactsTemplateComponent],
  template: `
    <div #dynamicComponentContainer dynamicComponentContainer></div>
  `,
  styleUrls: ['./custom-page.component.css']
})
export class CustomContentComponent {
  templateName = 'BasicTemplateComponent';
  page;
  link;
  userConfig;
  combinedObs;
  sub;
  currentComponent = null;
  @ViewChild('dynamicComponentContainer', {read: ViewContainerRef}) dynamicComponentContainer: ViewContainerRef;

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

  constructor(private resolver: ComponentFactoryResolver, private themeService: ThemeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const currentUser = this.themeService.getCurrentUser();
    const currentPage = this.route.params;

    currentUser
      .switchMap(data => this.userConfig = this.themeService.getUserConfig(data._id))
      .subscribe(() => {
        this.combinedObs = combineLatest(currentPage, currentUser, this.userConfig);
        this.sub = this.combinedObs.subscribe(info => {
          this.page = info[0]['link'];
          this.templateName = info[2]['pages'][this.page]['templateName'];
          console.log(this.templateName);
          if (!this.themeService.currentConfig) {
            return;
          }
        });
      });

    this.themeService.applyTemplate.subscribe(data => {
      this.templateName = data;
      this.applyTemplate();
    }, (error: string) => {
      console.error(error);
    });
    this.applyTemplate();
  }

  applyTemplate() {
    this.componentData = {
      component: TEMPLATES[this.templateName],
      inputs: {}
    };
    console.log(this.templateName);
  }
}

