import { Controller, Get, Put, Req } from '@nestjs/common';
import { UserConfigService } from './user-config.service';

@Controller('api')
export class UserConfigController {
  constructor(private readonly userConfigService: UserConfigService) {
  }

  @Get('/user-config/:userId')
  getUserConfig(@Req() req) {
    return this.userConfigService.getUserConfig(req.params.userId);
  }

  @Put('/user-config/:userId')
  private updateUserConfig(@Req() req) {
    return this.userConfigService
      .updateUserConfig(req.params.userId, req.body, (err) => {
        if (err) {
          console.error(err);
        }
      });
  }
}
