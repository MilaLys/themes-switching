import {Controller, Get, Param} from '@nestjs/common';
import {ThemeService} from './theme.service';
import {Theme} from './theme.interface';

@Controller('api')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {
  }

  @Get('/themes')
  async findAll(): Promise<Theme[]> {
    console.log( await this.themeService.findAll());
    return await this.themeService.findAll();
  }
}
