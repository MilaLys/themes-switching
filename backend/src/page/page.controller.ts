import {Body, Controller, Get, HttpStatus, Post, Put, Req, Res} from '@nestjs/common';
import {PageService} from './page.service';
import {Page} from './page.interface';

@Controller('api')
export class PageController {
  constructor(private readonly pageService: PageService) {
  }

  @Post('/pages')
  async addPage(@Res() res, @Body() pageData: Page) {
    try {
      const success = await this.pageService.addPage(pageData);
      res.status(201).json(success);
    } catch (error) {
      res.status(500).json(error);
    }
    res.status(HttpStatus.CREATED).send();
  }

  @Get('/page/:link')
  async getByLink(@Req() req, @Res() res) {
    try {
      const success = await this.pageService.getByLink(req.params.link);
      res.json(success);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
