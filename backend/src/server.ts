import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './modules/app.module';
import * as bodyParser from 'body-parser';
import * as express from '../node_modules/express';
import * as cors from 'cors';

const instance = express();
instance.use(cors());
instance.use(bodyParser.json());
const port = '3000';

NestFactory.create(ApplicationModule, instance).then(app => {
  app.listen(3000, () => {
    console.log(`App run on port ${+port}!`);
  });
}).catch(error => console.log(error));

