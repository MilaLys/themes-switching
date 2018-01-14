import {Controller, Get, Put, Req, Res} from '@nestjs/common';
import {UserConfigService} from './user-config.service';

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
    console.log(req.body);
    this.userConfigService.updateUserConfig(req.params.userId, req.body, (err, data) => {
      if (err) {
        return console.error(err);
      }
      res.json({data});
    });
  }

  // @Get('/user-config/:link')
  // async getByLink(@Req() req, @Res() res) {
  //   try {
  //     const success = await this.userConfigService.getByLink(req.params.link);
  //     console.log(res.json(success));
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // }

  // @Get('/user-config/:link')
  // getByLink(@Req() req, @Res() res) {
  //   this.userConfigService.getByLink(req.params.link).then(data => res.json(data));
  // }
}
