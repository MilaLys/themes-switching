import {Component, Inject} from '@nestjs/common';
import {Model} from 'mongoose';
import {UserConfigs} from './user-configs.interface';

@Component()
export class UserConfigsService {

  constructor(@Inject('UserConfigsModelToken') private readonly userConfigsModel: Model<UserConfigs>) {
  }

  // async createCurrentConfig(createUserConfig, cb): Promise<any> {
  //   const createdConfig = new this.userConfigsModel({startDate: new Date, endDate: new Date('3000-01-25T14:43:47.002Z'), createUserConfig});
  //   console.log(createdConfig);
  //   return await createdConfig.save(cb);
  // }

  async getAllConfigs(cb) {
    return await this.userConfigsModel.find({}).exec(cb);
  }

  async getLastConfig(date, cb) {
    return await this.userConfigsModel.findOne({date: date}).lean().exec(cb);
  }
}

