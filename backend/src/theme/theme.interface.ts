import {Document} from 'mongoose';

export interface Theme extends Document {
  name: string;
  isVisibleLogo: boolean;
  isVisibleMenu: boolean;
}
