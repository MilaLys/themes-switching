import { Document } from 'mongoose';

export interface UserFiles extends Document {
  data: object;
}
