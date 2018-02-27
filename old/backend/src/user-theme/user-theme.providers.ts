import { UserThemeSchema } from './user-theme.schema';
import { Connection } from 'mongoose';

export const UserThemeProviders = [
  {
    provide: 'UserThemeModelToken',
    useFactory: (connection: Connection) => connection.model('UserTheme', UserThemeSchema, 'user-theme'),
    inject: ['DbConnectionToken']
  },
];
