import {MenuItem} from './menu-item.interface';

export interface CurrentConfig {
  config: {
    _id: string;
    userId: number;
    isVisibleMenu: boolean;
    isVisibleLogo: boolean;
    logoName: string;
    menuItems: MenuItem[];
    pages: any;
  };
}
