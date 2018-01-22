import {ReflectiveInjector} from '@angular/core';

const requiredMetadataKey = 'data';
export function ComponentLoader() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metadataKey = `__${requiredMetadataKey}_parameters`;
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    }
    const originalMethod = descriptor.set;

    descriptor.set = function (...args: any[]) {
      const index = target[metadataKey];
      const resolver = this.resolver;
      const dynamicComponentContainer = this.dynamicComponentContainer;
      const currentComponent = this.currentComponent;

      if (!args[index]) {
        originalMethod.apply(this, args);
        return;
      }

      const data = args[index];

      const inputProviders = Object.keys(data.inputs).map((inputName) => {
        return {provide: inputName, useValue: data.inputs[inputName]};
      });
      const resolvedInputs = ReflectiveInjector.resolve(inputProviders);
      const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, dynamicComponentContainer.parentInjector);
      const factory = resolver.resolveComponentFactory(data.component);
      const component = factory.create(injector);

      dynamicComponentContainer.insert(component.hostView);

      if (currentComponent) {
        currentComponent.destroy();
      }
      this.currentComponent = component;
      originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

export function inputData(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  const metadataKey = `__${requiredMetadataKey}_parameters`;
  target[metadataKey] = parameterIndex;
}
