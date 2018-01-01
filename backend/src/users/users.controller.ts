import { Controller, Get, Put, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get('/user')
  getCurrentUser(@Req() req, @Res() res) {
    this.usersService.getCurrentUser().then((data) => res.json(data));
  }
}
