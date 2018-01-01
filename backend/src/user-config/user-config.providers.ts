import {UserConfigSchema} from './user-config.schema';
import {Connection} from 'mongoose';

export const UserConfigProviders = [
  {
    provide: 'UserConfigModelToken',
    useFactory: (connection: Connection) => connection.model('UserConfig', UserConfigSchema, 'user-config'),
    inject: ['DbConnectionToken']
  },
];
