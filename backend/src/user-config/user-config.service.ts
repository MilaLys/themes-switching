import { Component, Inject } from '@nestjs/common';
import { UserConfig } from './user-config.interface';
import { Model } from 'mongoose';

@Component()
export class UserConfigService {

  constructor(@Inject('UserConfigModelToken') private readonly userConfigModel: Model<UserConfig>) {
  }

  async getAllConfigs(cb) {
    return await this.userConfigModel.find({}).exec(cb);
  }

  async getUserConfig(userId): Promise<UserConfig> {
    const dateNow = (new Date()).toISOString();
    return await this.userConfigModel.findOne({userId: userId, endDate: {$gt: dateNow}}).exec();
  }

  async updateUserConfig(userId, config, cb): Promise<any> {
    const dateNow = (new Date()).toISOString();
    this.userConfigModel
      .update({userId: userId, endDate: {$gt: dateNow}},
        {
          $set: {
            'endDate': dateNow
          }
        }
      )
      .exec();
    const newConfig = config;
    newConfig.startDate = dateNow;
    newConfig.endDate = (new Date('3000-01-01')).toISOString();
    newConfig.userId = userId;
    const createdConfig = new this.userConfigModel(newConfig);
    return await createdConfig.save(cb);
  }
}
