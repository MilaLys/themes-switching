import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {UsersProviders} from './users.providers';
import {DatabaseModule} from '../database/db.module';

@Module({
  modules: [DatabaseModule],
  controllers: [UsersController],
  components: [UsersService, ...UsersProviders],
})
export class UsersModule {
}
