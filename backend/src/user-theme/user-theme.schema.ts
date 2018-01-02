import * as mongoose from 'mongoose';

export const UserThemeSchema = new mongoose.Schema({
  userId: String,
  themeId: Number
});

