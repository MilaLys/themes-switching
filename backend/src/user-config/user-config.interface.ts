import {Document} from 'mongoose';

export interface UserConfig extends Document {
  data: object;
}
