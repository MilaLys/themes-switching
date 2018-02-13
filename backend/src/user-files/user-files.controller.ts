import { Controller, Get, Post, Req, Res } from '@nestjs/common';
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

  @Get('/user-files/versions/:userId')
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
}
