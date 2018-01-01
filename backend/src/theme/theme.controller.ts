import {Controller, Get, Put, Req, Res} from '@nestjs/common';
import {ThemeService} from './theme.service';
import {Theme} from './theme.interface';

@Controller('api')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {
  }

  @Get('/themes')
   findAll(@Req() req, @Res() res) {
     this.themeService.findAll().then((data) => res.json(data));
  }

  @Get('/themes/:id')
    findOne(@Req() req, @Res() res) {
    this.themeService.findOne(req.params.id).then((data) => res.json(data));
  }

  // @Put('/themes/:id')
  // private updateThemeConfig(@Req() req, @Res() res) {
  //   this.themeService.update(req.params.id, req.body, (err, theme) => {
  //     if (err) {
  //       return console.error(err);
  //     }
  //     res.json(theme);
  //   });
  // }
}
