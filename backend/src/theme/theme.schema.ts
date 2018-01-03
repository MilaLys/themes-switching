import * as mongoose from 'mongoose';

export const ThemeSchema = new mongoose.Schema({
  id: Number,
  themeName: String,
  logoName: String,
  isVisibleLogo: Boolean,
  isVisibleMenu: Boolean,
  headerDark: Boolean
});

