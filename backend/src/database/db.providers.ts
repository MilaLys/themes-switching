import * as mongoose from 'mongoose';
import * as config from 'config-node';

config();

const mongoDb = process.env.MONGODB_URL || config.db.url;

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async() => {
      (mongoose as any).Promise = global.Promise;
      await mongoose.connect(mongoDb, { // mongodb://localhost:27017/church-app-test
        useMongoClient: true
      }).then(
        () => {
          console.log('Success!');
        },
        err => {
          console.log(err);
        });
      return mongoose;
    },
  }
];

