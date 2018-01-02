import { Controller, Get, Put, Req, Res } from '@nestjs/common';
import { UserThemeService } from './user-theme.service';

@Controller('api/user-theme')
export class UserThemeController {
  constructor(private readonly userThemeService: UserThemeService) {
  }

  @Get('/:userId')
  getUserTheme(@Req() req, @Res() res) {
   this.userThemeService.getUserTheme(req.params.userId).then((data) => res.json(data));
  }

  @Put('/:userId')
  updateUserTheme(@Req() req, @Res() res) {
    this.userThemeService.updateUserTheme(req.params.userId, req.body.themeId, (err, themeId) => {
      if (err) {
        return console.error(err);
      }
      res.json(themeId);
    });
  }
}
