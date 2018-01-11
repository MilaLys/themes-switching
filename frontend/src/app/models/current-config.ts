import {Page} from './page.interface';

export interface CurrentConfig {
  _id: string;
  userId: number;
  isVisibleMenu: boolean;
  isVisibleLogo: boolean;
  logoName: string;
  menuItems: any;
  pages: Page;
}
