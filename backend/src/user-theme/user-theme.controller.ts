import { Controller, Get, Put, Req, Res } from '@nestjs/common';
import { UserThemeService } from './user-theme.service';

@Controller('api')
export class UserThemeController {
  constructor(private readonly userThemeService: UserThemeService) {
  }

  @Get('/user-theme/:userId')
  getUserTheme(@Req() req, @Res() res) {
   this.userThemeService.getUserTheme(req.params.userId).then((data) => res.json(data));
  }

  @Put('/user-theme/:userId')
  private updateUserTheme(@Req() req, @Res() res) {
    console.log(req.params.userId);
    this.userThemeService.updateUserTheme(req.params.userId, req.body, (err, themeConfig) => {
      if (err) {
        return console.error(err);
      }
      res.json(themeConfig);
    });
  }
}
