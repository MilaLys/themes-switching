import {Controller, Get, Param} from "@nestjs/common";
import {ThemeService} from './theme.service';

@Controller('theme')
export class ThemeController{
  constructor (private readonly themeService: ThemeService){}

@Get()
async getAll(): Promise<any> {
  return this.themeService.getAll();
}

@Get(':id')
getOne(@Param('id') {
  return {};
}}
