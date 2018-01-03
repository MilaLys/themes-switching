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
    console.log(config);
    this.userConfigModel
      .update({userId: userId},
        {
          isVisibleMenu: config.isVisibleMenu,
          isVisibleLogo: config.isVisibleLogo,
          logoName: config.logoName,
          menuItem: config.menuItem
        })
      .lean()
      .exec(cb);
  }
}

