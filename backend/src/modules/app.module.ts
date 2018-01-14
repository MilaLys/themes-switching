import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/db.module';
import {ThemeModule} from '../theme/theme.module';
import {UsersModule} from "../users/users.module";
import {UserConfigModule} from "../user-config/user-config.module";
import {UserThemeModule} from "../user-theme/user-theme.module";

@Module({
  modules: [DatabaseModule, ThemeModule, UsersModule, UserConfigModule, UserThemeModule],
  controllers: [],
  components: [],
})
export class ApplicationModule {
}
