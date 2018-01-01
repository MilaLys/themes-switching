import * as mongoose from 'mongoose';

export const UserConfigSchema = new mongoose.Schema({
  userId: String,
  isVisibleMenu: Boolean,
  isVisibleLogo: Boolean,
  logoName: String,
  headerDark: Boolean
});

