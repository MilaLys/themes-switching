import {Connection} from 'mongoose';
import {UserConfigsSchema} from './user-configs.schema';

export const UserConfigsProviders = [
  {
    provide: 'UserConfigsModelToken',
    useFactory: (connection: Connection) => connection.model('UserConfigs', UserConfigsSchema, 'user-configs'),
    inject: ['DbConnectionToken']
  },
];
