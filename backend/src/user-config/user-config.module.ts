import { Module } from '@nestjs/common';
import { UserConfigController } from './user-config.controller';
import { UserConfigService } from './user-config.service';
import { UserConfigProviders } from './user-config.providers';
import { DatabaseModule } from '../database/db.module';

@Module({
  modules: [DatabaseModule],
  controllers: [UserConfigController],
  components: [UserConfigService, ...UserConfigProviders],
})
export class UserConfigModule {
}
