import { Component, Inject } from '@nestjs/common';
import { Theme } from './theme.interface';
import { Model } from 'mongoose';

@Component()
export class ThemeService {
  constructor(@Inject('ThemeModelToken') private readonly themeModel: Model<Theme>) {
  }

  async findAll(): Promise<Theme[]> {
    return this.themeModel.find({}).exec();
  }

  async findOne(id): Promise<Theme> {
    return this.themeModel.findOne({id: id}).exec();
  }
}
