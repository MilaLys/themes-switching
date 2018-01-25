import {Module} from '@nestjs/common';
import {UserConfigsController} from './user-configs.controller';
import {UserConfigsService} from './user-configs.service';
import {UserConfigsProviders} from './user-configs.providers';
import {DatabaseModule} from '../database/db.module';

@Module({
  modules: [DatabaseModule],
  controllers: [UserConfigsController],
  components: [UserConfigsService, ...UserConfigsProviders],
})
export class UserConfigsModule {
}
