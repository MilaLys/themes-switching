import {Module} from '@nestjs/common';
import {UserThemeController} from './user-theme.controller';
import {UserThemeService} from './user-theme.service';
import {UserThemeProviders} from './user-theme.providers';
import {DatabaseModule} from '../database/db.module';

@Module({
  modules: [DatabaseModule],
  controllers: [UserThemeController],
  components: [UserThemeService, ...UserThemeProviders],
})
export class UserThemeModule {
}
