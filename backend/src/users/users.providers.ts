import { UsersSchema } from './users.schema';
import { Connection } from 'mongoose';

export const UsersProviders = [
  {
    provide: 'UsersModelToken',
    useFactory: (connection: Connection) => connection.model('Users', UsersSchema, 'users'),
    inject: ['DbConnectionToken']
  },
];
