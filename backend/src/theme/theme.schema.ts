import * as mongoose from 'mongoose';

export const ThemeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  isVisibleLogo: Boolean,
  isVisibleMenu: Boolean
});

