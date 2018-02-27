import { Document } from 'mongoose';

export interface UserTheme extends Document {
  userId: string;
  themeId: number;
}
