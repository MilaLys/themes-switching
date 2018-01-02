import { Controller, Get, Put, Req, Res } from '@nestjs/common';
import { UserConfigService } from './user-config.service';

@Controller('api')
export class UserConfigController {
  constructor(private readonly userConfigService: UserConfigService) {
  }

  @Get('/user-config/:userId')
  getUserConfig(@Req() req, @Res() res) {
   this.userConfigService.getUserConfig(req.params.userId).then((data) => res.json(data));
  }

  @Put('/user-config/:userId')
  updateUserConfig(@Req() req, @Res() res) {
    this.userConfigService.updateUserConfig(req.params.userId, req.body, (err, data) => {
      if (err) {
        return console.error(err);
      }
      res.json({data});
    });
  }
}
