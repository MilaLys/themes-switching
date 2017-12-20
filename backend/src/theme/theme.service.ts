import {Component, Inject} from '@nestjs/common';
import {Theme} from './theme.interface';
import {Model} from 'mongoose';
require('../../index');

@Component()
export class ThemeService {
  constructor(@Inject('ThemeModelToken') private readonly themeModel: Model<Theme>) {
  }

  async findAll(): Promise<Theme[]> {
    return this.themeModel.find({}).exec();
  }

  async update(id, data, cb) {
    this.themeModel.update({_id: id}, {$set: data}).lean().exec(cb);
  }
}
