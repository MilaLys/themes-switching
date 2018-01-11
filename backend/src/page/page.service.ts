import {Component, Inject} from '@nestjs/common';
import {Page} from './page.interface';
import {Model} from 'mongoose';

@Component()
export class PageService {
  constructor(@Inject('PageModelToken') private readonly pageModel: Model<Page>) {
  }

  async addPage(pageData: Page): Promise<Page> {
   const createdPage = new this.pageModel(pageData);
   return await createdPage.save();
  }


  async getByLink(link) {
    return this.pageModel.findOne({link: link}).lean().exec();
  }
}

