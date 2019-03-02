import { Body, Controller, Delete, Get, Param, Post, Put, Query, HttpException, HttpStatus, UseFilters } from '@nestjs/common';

import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from 'src/Forbidden/forbidden.exception';
import { HttpExceptionFilter } from 'src/exception/HTTP-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }


  //异常处理首选 httpexception 以减少内存使用量
  @Get()
  @UseFilters(new HttpExceptionFilter()) //异常过滤器
  async findAll(): Promise<Cat[]> {
    // throw new HttpException('123', HttpStatus.FORBIDDEN);

    // throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   error: 'This is a custom message',
    // }, 403);

    // 自定义异常 继承了HttpException
    throw new ForbiddenException();

    return this.catsService.findAll();
  }

  // @Post()
  // create(@Body() createCatDto) {
  //   return 'This action adds a new cat';
  // }

  // @Get()
  // findAll(@Query() query) {
  //   return `This action returns all cats (limit: ${query.limit} items)`;
  // }

  @Get(':id')
  findOne(@Param('id') id) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id, @Body() updateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return `This action removes a #${id} cat`;
  }
}
