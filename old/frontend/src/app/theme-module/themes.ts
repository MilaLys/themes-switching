import {HeaderComponent} from '../customize-module/templates/page-components/header/header.component';
import {MenuComponent} from '../customize-module/templates/page-components/menu/menu.component';
import {BasicTemplateComponent} from '../customize-module/templates/pages/custom-page/basic-template/basic-template.component';
import {ContactsTemplateComponent} from '../customize-module/templates/pages/custom-page/contacts-template/contacts-template.component';
import {DefaultThemeComponent} from './default-theme/default-theme.component';
import {DarkThemeComponent} from './dark-theme/dark-theme.component';
import {LightThemeComponent} from './light-theme/light-theme.component';

export const THEMES = [
  DefaultThemeComponent,
  DarkThemeComponent,
  LightThemeComponent
];

export const THEMES_ID = {
  0: DefaultThemeComponent,
  1: LightThemeComponent,
  2: DarkThemeComponent
};

export const THEMES_COMPONENT = [
  HeaderComponent,
  MenuComponent
];

export const TEMPLATES = {
  'BasicTemplateComponent': BasicTemplateComponent,
  'ContactsTemplateComponent': ContactsTemplateComponent
};
