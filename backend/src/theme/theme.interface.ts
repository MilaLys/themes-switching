import {Document} from 'mongoose';

export interface Theme extends Document {
  themeName: string;
  logoName: string;
  isVisibleLogo: boolean;
  isVisibleMenu: boolean;
  headerDark: boolean;
  files: object[];
}
