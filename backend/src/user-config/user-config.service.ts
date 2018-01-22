import { Component, Inject } from '@nestjs/common';
import { UserConfig } from './user-config.interface';
import { Model } from 'mongoose';

@Component()
export class UserConfigService {
  constructor(@Inject('UserConfigModelToken') private readonly userConfigModel: Model<UserConfig>) {
  }

  async getUserConfig(userId): Promise<UserConfig> {
    return this.userConfigModel.findOne({userId: userId}).exec();
  }

  async updateUserConfig(userId, config, cb) {
    this.userConfigModel
      .update({userId: userId},
        {
          $set: {
            'isVisibleMenu': config.isVisibleMenu,
            'isVisibleLogo': config.isVisibleLogo,
            'logoName': config.logoName,
            'pages': config.pages
          },
          $push: {
            'menuItems': {$each: config.menuItems}

          }
        }
      )
      .lean()
      .exec(cb);
  }
}

