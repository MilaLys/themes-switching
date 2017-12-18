import {Module} from '@nestjs/common';
/*import {AppController} from './app.controller';*/
import {DatabaseModule} from '../database/db.module';
import {ThemeModule} from '../theme/theme.module';

@Module({
  modules: [DatabaseModule, ThemeModule],
  controllers: [],
  components: [],
})
export class ApplicationModule {
}
