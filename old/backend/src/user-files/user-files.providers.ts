import { UserFilesSchema } from './user-files.schema';
import { Connection } from 'mongoose';

export const UserFilesProviders = [
  {
    provide: 'UserFilesModelToken',
    useFactory: (connection: Connection) => connection.model('UserFiles', UserFilesSchema, 'user-files'),
    inject: ['DbConnectionToken']
  },
];

