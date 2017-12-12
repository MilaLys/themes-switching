import { Component } from '@nestjs/common';
import {Theme} from './theme.interface';
import * as mongoose from 'mongoose';
import {ThemeSchema} from './theme.schema';

const Themes = mongoose.model('ThemeSchema');
@Component()
export class ThemeService {
  public getAll(name) {
    return Themes.findOne({name});
  }
}
