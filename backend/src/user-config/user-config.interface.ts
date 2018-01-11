import {Document} from 'mongoose';

export interface UserConfig extends Document {
  userId: string;
  isVisibleMenu: boolean;
  isVisibleLogo: boolean;
  logoName: string;
  menuItems: object;
  pages: object;
}
