import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/db.module';
import { UserFilesService } from './user-files.service';
import { UserFilesController } from './user-files.controller';
import { UserFilesProviders } from './user-files.providers';

@Module({
  modules: [DatabaseModule],
  controllers: [UserFilesController],
  components: [UserFilesService, ...UserFilesProviders],
})
export class UserFilesModule {
}
