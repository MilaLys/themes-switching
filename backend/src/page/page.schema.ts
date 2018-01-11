import * as mongoose from 'mongoose';

export const PageSchema = new mongoose.Schema({
  link: String,
  title: String,
  content: String
});

