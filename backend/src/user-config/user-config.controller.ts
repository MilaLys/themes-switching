import {Body, Controller, Get, HttpStatus, Post, Put, Req, Res} from '@nestjs/common';
import {UserConfigService} from './user-config.service';
import {UserConfig} from './user-config.interface';

@Controller('api')
export class UserConfigController {
  constructor(private readonly userConfigService: UserConfigService) {
  }

  @Get('/user-config')
  private getAllConfigs(@Res() res) {
    this.userConfigService.getAllConfigs((err, configs) => {
      if (err) {
        return console.error(err);
      }
      res.json({configs});
    });
  }

  @Get('/user-config/:userId')
  getUserConfig(@Req() req, @Res() res) {
    this.userConfigService.getUserConfig(req.params.userId).then((data) => res.json(data));
  }

  @Post('/user-config/:userId')
  private create(@Req() req, @Res() res) {
    this.userConfigService.updateUserConfig(req.params.userId, req.body, (err, data) => {
      if (err) {
        return console.error(err);
      }
      res.json({data});
    });
  }
}
