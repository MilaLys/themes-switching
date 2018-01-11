import {PageSchema} from './page.schema';
import {Connection} from 'mongoose';

export const PageProviders = [
  {
    provide: 'PageModelToken',
    useFactory: (connection: Connection) => connection.model('Page', PageSchema, 'page'),
    inject: ['DbConnectionToken']
  },
];
