import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './modules/app.module';
import * as bodyParser from 'body-parser';
import * as express from '../node_modules/express';
import * as cors from 'cors';
import * as config from 'config-node';

config();

const instance = express();

instance.use(cors());
instance.use(bodyParser.json());

const port = process.env.PORT || config.port; // '3000';

NestFactory.create(ApplicationModule, instance).then(app => {
  app.listen(+port, () => {
    console.log(`App run on port ${+port}!`);
  });
}).catch(error => console.log(error));

