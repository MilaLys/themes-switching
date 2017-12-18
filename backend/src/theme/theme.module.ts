import {Module} from '@nestjs/common';
import {ThemeController} from './theme.controller';
import {ThemeService} from './theme.service';
import {ThemeProviders} from './theme.providers';
import {DatabaseModule} from '../database/db.module';

@Module({
  modules: [DatabaseModule],
  controllers: [ThemeController],
  components: [ThemeService, ...ThemeProviders],
})
export class ThemeModule {
}
