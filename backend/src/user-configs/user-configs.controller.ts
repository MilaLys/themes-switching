import {Controller, Get, Post, Req, Res} from '@nestjs/common';
import {UserConfigsService} from './user-configs.service';

@Controller('api')
export class UserConfigsController {
  constructor(private readonly userConfigsService: UserConfigsService) {
  }

  // @Post('/user-configs')
  // private create( @Req() req, @Res() res) {
  //   this.userConfigsService.createCurrentConfig(req.body, (err, data) => {
  //     if (err) {
  //       return console.error(err);
  //     }
  //     res.json({data});
  //   });
  // }

  // @Get('/user-configs')
  // private getAllConfigs(@Res() res) {
  //   this.userConfigsService.getAllConfigs((err, configs) => {
  //     if (err) {
  //       return console.error(err);
  //     }
  //     res.json({configs});
  //   });
  // }

  // @Get(':/date')
  // private getLastConfig(@Req() req, @Res() res) {
  //   this.getLastConfig(req.params.date, (err, config) => {
  //     if (err) {
  //       return console.error(err);
  //     }
  //     res.json({config});
  //   });
  // }
}
