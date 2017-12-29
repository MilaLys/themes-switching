import {LightThemeComponent} from './themes/light-theme/light-theme.component';
import {DefaultThemeComponent} from './themes/default-theme/default-theme.component';
import {DarkThemeComponent} from './themes/dark-theme/dark-theme.component';
import {HeaderComponent} from './themes/header/header.component';
import {MenuComponent} from './themes/menu/menu.component';

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

