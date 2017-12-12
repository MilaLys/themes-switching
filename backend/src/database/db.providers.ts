import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async() => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect('mongodb://localhost:27017/themes', {
        useMongoClient: true
      }).then(
        () => {
          console.log('Success!')
        },
        err => {
          console.log(err)
        });
    },
  }
];

