import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';

export const UserConfigsSchema = new mongoose.Schema({
  any: Schema.Types.Mixed
}, {strict: false});

