import {Document} from 'mongoose';

export interface UserConfig extends Document {
  userId: string;
  isVisibleMenu: string;
  isVisibleLogo: string;
  logoName: string;
  headerDark: boolean;
}
