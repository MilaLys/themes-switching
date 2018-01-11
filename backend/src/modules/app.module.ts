import {Module} from '@nestjs/common';
/*import {AppController} from './app.controller';*/
import {DatabaseModule} from '../database/db.module';
import {ThemeModule} from '../theme/theme.module';
import {UsersModule} from "../users/users.module";
import {UserConfigModule} from "../user-config/user-config.module";
import {UserThemeModule} from "../user-theme/user-theme.module";
import {PageModule} from '../page/page.module';

@Module({
  modules: [DatabaseModule, ThemeModule, UsersModule, UserConfigModule, UserThemeModule, PageModule],
  controllers: [],
  components: [],
})
export class ApplicationModule {
}
