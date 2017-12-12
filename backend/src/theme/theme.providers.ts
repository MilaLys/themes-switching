import { Connection } from 'mongoose';
import { ThemeSchema } from '../theme/theme.schema';

export const ThemeProviders = [
  {
    provide: 'ThemeModelToken',
    useFactory: (connection: Connection) => connection.model('Theme', ThemeSchema),
    inject: ['DbConnectionToken']
  },
];
