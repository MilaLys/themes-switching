import { Component, Inject } from '@nestjs/common';
import { UserConfig } from './user-config.interface';
import { Model } from 'mongoose';

// require('../../index');

@Component()
export class UserConfigService {
  constructor(@Inject('UserConfigModelToken') private readonly userConfigModel: Model<UserConfig>) {
  }

  async getUserConfig(userId): Promise<UserConfig> {
    return this.userConfigModel.findOne({userId: userId}).exec();
  }

  async updateUserConfig(userId, data, cb) {
    this.userConfigModel.update({userId: userId}, {data: data});
  }
}

// update
// get by user_id
