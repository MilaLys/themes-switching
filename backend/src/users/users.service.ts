import { Component, Inject } from '@nestjs/common';
import { Users } from './users.interface';
import { Model } from 'mongoose';

// require('../../index');

@Component()
export class UsersService {
  constructor(@Inject('UsersModelToken') private readonly usersModel: Model<Users>) {
  }

// get current user
  async getCurrentUser(): Promise<Users> {
    return this.usersModel.findOne({"email":"aa@aa.aa"}).exec();
  }
}

