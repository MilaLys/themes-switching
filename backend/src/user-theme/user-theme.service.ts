import { Component, Inject } from '@nestjs/common';
import { UserTheme } from './user-theme.interface';
import { Model } from 'mongoose';

@Component()
export class UserThemeService {
  constructor(@Inject('UserThemeModelToken') private readonly userThemeModel: Model<UserTheme>) {
  }

  async getUserTheme(userId): Promise<UserTheme> {
    return this.userThemeModel.findOne({userId: userId}).exec();
  }

  async updateUserTheme(userId, themeId, cb) {
    this.userThemeModel.update({userId: userId}, {themeId: themeId}).lean().exec(cb);
  }
}
