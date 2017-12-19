import * as mongoose from 'mongoose';

export const ThemeSchema = new mongoose.Schema({
  name: String,
  isVisibleLogo: Boolean,
  isVisibleMenu: Boolean
});

