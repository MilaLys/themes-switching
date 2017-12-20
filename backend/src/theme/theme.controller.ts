import {Controller, Get, Param, Put, Req, Res} from '@nestjs/common';
import {ThemeService} from './theme.service';
import {Theme} from './theme.interface';
import {error} from 'util';

@Controller('api')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {
  }

  @Get('/themes')
  async findAll(): Promise<Theme[]> {
    return this.themeService.findAll();
  }

  @Put('/themes/:id')
  private updateThemeConfig(@Req() req, @Res() res) {
    this.themeService.update(req.params.id, req.body, (err, theme) => {
      if (err) {
        return console.error(err);
      }
      res.json({theme});
    });
  }
}
