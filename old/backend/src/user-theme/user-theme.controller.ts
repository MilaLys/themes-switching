import { Controller, Get, Put, Req, Res } from '@nestjs/common';
import { UserThemeService } from './user-theme.service';

@Controller('api/user-theme')
export class UserThemeController {
  constructor(private readonly userThemeService: UserThemeService) {
  }

  @Get('/:userId')
  getUserTheme(@Req() req) {
    return this.userThemeService.getUserTheme(req.params.userId);
  }

  @Put('/:userId')
  updateUserTheme(@Req() req) {
    return this.userThemeService.updateUserTheme(req.params.userId, req.body.themeId, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}
