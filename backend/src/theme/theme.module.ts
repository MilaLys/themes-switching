import { Module } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { ThemeService } from './theme.service';
import {DatabaseModule} from "../database/db.module";
import {ThemeProviders} from "./theme.providers";

@Module({
  modules: [DatabaseModule],
  controllers: [ThemeController],
  components: [ThemeService, ...ThemeProviders],
})
export class ThemeModule {}
