import { ThemeSchema } from './theme.schema';
import { Connection } from 'mongoose';

export const ThemeProviders = [
  {
    provide: 'ThemeModelToken',
    useFactory: (connection: Connection) => connection.model('Theme', ThemeSchema, 'themes'),
    inject: ['DbConnectionToken']
  },
];
