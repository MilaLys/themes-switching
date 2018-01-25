import {Document} from 'mongoose';

export interface UserConfigs extends Document {
 data: object;
}
