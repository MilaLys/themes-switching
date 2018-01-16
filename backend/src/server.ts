import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './modules/app.module';
import * as bodyParser from 'body-parser';
import * as express from '../node_modules/express';
import * as cors from 'cors';
import * as config from 'config-node';
import * as path from 'path';

config();

let root = path.join(__dirname, '../');
if (process.env.NODE_ENV === 'production') {
  root = path.join(__dirname, '../../');
}
global.appRoot = path.resolve(root);

const instance = express();

instance.use(cors());
instance.use(bodyParser.json());

instance.use(express.static(path.join(global.appRoot, './frontend/dist')));

const port = process.env.PORT || config.port || 3000; // '3000';

NestFactory.create(ApplicationModule, instance).then(app => {
  app.listen(+port, '0.0.0.0', () => {
    console.log(`App run on port ${+port}!`);
  });
}).catch(error => console.log(error));

