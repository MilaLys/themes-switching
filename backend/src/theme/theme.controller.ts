import { Controller, Get, Req } from '@nestjs/common';
import { ThemeService } from './theme.service';

@Controller('api')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {
  }

  @Get('/themes')
  findAll(@Req() req) {
    return this.themeService.findAll();
  }

  @Get('/themes/:id')
  findOne(@Req() req) {
    return this.themeService.findOne(req.params.id);
  }
}
