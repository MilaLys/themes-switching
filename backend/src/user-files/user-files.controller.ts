import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { UserFilesService } from './user-files.service';


@Controller('api')
export class UserFilesController {
  constructor(private readonly userFilesService: UserFilesService) {
  }

  @Get('/user-files/:userId')
  private getAllFiles(@Req() req) {
    return this.userFilesService.getAllFiles(req.params.userId);
  }

  @Get('/user-files/:userId')
  getLastUserFile(@Req() req) {
    return this.userFilesService.getLastUserFile(req.params.userId, req.params.key);
  }

  @Get('/user-files/versions/:userId/:key')
  getFileVersions(@Req() req) {
    return this.userFilesService.getFileVersions(req.params.userId, req.params.key);
  }

  @Post('/user-files/:userId')
  private create(@Req() req) {
    return this.userFilesService.updateUserFile(req.params.userId, req.body.key, req.body.value, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  @Delete('/user-files/:userId')
  private deleteFile(@Req() req) {
    return this.userFilesService.deleteFile(req.params.userId, req.body.key);
  }

  @Put('/user-files/:userId')
  private renameFile(@Req() req) {
    return this.userFilesService.renameFile(req.params.userId, req.body.currentFile, req.body.newFileName);
  }
}
