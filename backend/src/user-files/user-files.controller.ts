import {Controller, Delete, Get, Post, Put, Req, Res} from '@nestjs/common';
import { UserFilesService } from './user-files.service';


@Controller('api')
export class UserFilesController {
  constructor(private readonly userFilesService: UserFilesService) {
  }

  @Get('/user-files/:userId')
  private getAllFiles(@Req() req, @Res() res) {
    this.userFilesService
      .getAllFiles(req.params.userId, (err, configs) => {
        if (err) {
          return console.error(err);
        }
        res.json({configs});
      });
  }

  @Get('/user-files/:userId')
  getLastUserFile(@Req() req, @Res() res) {
    this.userFilesService
      .getLastUserFile(req.params.userId, req.params.key)
      .then((data) => res.json(data));
  }

  @Get('/user-files/versions/:userId/:key')
  getFileVersions(@Req() req, @Res() res) {
    this.userFilesService
      .getFileVersions(req.params.userId, req.params.key)
      .then((data) => res.json(data));
  }

  @Post('/user-files/:userId')
  private create(@Req() req, @Res() res) {
    this.userFilesService
      .updateUserFile(req.params.userId, req.body.key, req.body.value, (err, data) => {
        if (err) {
          return console.error(err);
        }
        res.json({data});
      });
  }

  @Delete('/user-files/:userId')
  private deleteFile(@Req() req, @Res() res) {
    this.userFilesService
      .deleteFile(req.params.userId, req.body.key);
  }

  @Put('/user-files/:userId')
  private renameFile(@Req() req, @Res() res) {
    console.log(123);
    this.userFilesService
      .renameFile(req.params.userId, req.body.key, (err, data) => {
        if (err) {
          return console.error(err);
        }
        res.json(data);
      });
  }
}
