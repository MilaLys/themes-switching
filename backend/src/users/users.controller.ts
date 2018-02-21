import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get('/user')
  getCurrentUser(@Req() req) {
    return this.usersService.getCurrentUser();
  }
}
