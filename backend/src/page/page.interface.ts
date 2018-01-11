import {Document} from 'mongoose';

export interface Page extends Document {
  link: string;
  title: string;
  content: string;
}
