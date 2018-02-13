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
    return await this.userConfigModel.findOne({userId: userId}).exec();
  }

  async updateUserConfig(userId, data, cb) {
    this.userConfigModel.update({userId: userId}, {$set: data}).lean().exec(cb);
  }
}
