import {Component, Inject} from '@nestjs/common';
import {UserConfig} from './user-config.interface';
import {Model} from 'mongoose';

@Component()
export class UserConfigService {

  constructor(@Inject('UserConfigModelToken') private readonly userConfigModel: Model<UserConfig>) {
  }

  async getUserConfig(userId): Promise<UserConfig> {
    return this.userConfigModel.findOne({userId: userId}).exec();
  }

  // async updateUserConfig(userId, config, cb) {
  //   const newConfig = this.userConfigModel
  //     .update({userId: userId},
  //       {
  //         $set: {
  //           'isVisibleMenu': config.isVisibleMenu,
  //           'isVisibleLogo': config.isVisibleLogo,
  //           'logoName': config.logoName,
  //           'pages': config.pages
  //         },
  //         $push: {
  //           'menuItems': {$each: config.menuItems}
  //         }
  //       }
  //     )
  //     .lean()
  //     .exec(cb);
  // }

  async updateUserConfig(userId, config, cb): Promise<any> {
    config.startDate = new Date;
    config.endDate = new Date('3000-01-25T14:43:47.002Z');
    config.userId = userId;
    const createdConfig = new this.userConfigModel({config});
    return await createdConfig.save(cb);
  }
}
