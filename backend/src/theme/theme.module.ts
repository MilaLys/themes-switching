import { Module } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { ThemeService } from './theme.service';

@Module({
  controllers: [ThemeController],
  components: [ThemeService],
})
export class ThemeModule {}