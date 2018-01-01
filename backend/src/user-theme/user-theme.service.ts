import { Component, Inject } from '@nestjs/common';
import { UserTheme } from './user-theme.interface';
import { Model } from 'mongoose';

// require('../../index');

@Component()
export class UserThemeService {
  constructor(@Inject('UserThemeModelToken') private readonly userThemeModel: Model<UserTheme>) {
  }

  async updateUserTheme(themeId, userId, cb) {
    this.userThemeModel.update({userId: userId}, {themeId: themeId}).lean().exec(cb);
  }

  async getUserTheme(userId): Promise<UserTheme> {
    return this.userThemeModel.findOne({userId: userId}).exec();
  }
}

// update by user_id
// get by user_id
