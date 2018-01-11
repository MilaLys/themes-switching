import {Module} from '@nestjs/common';
import {PageController} from './page.controller';
import {PageService} from './page.service';
import {PageProviders} from './page.providers';
import {DatabaseModule} from '../database/db.module';

@Module({
  modules: [DatabaseModule],
  controllers: [PageController],
  components: [PageService, ...PageProviders],
})
export class PageModule {
}
